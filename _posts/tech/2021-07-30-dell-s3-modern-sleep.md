---
layout: post
title:  "Enabling S3 Sleep on Dell XPS 13 (7390 2-in-1)"
categories: Tech
image: 
  path: posts/tech/2021-07-30-dell-s3-modern-sleep/hero.png
  thumbnail: posts/tech/2021-07-30-dell-s3-modern-sleep/hero.png
  caption: |
    [CC0 Public Domain](https://www.maxpixel.net/White-Sleeping-Animal-Tiger-Lazy-Zoo-Cat-1285229)
tags:
  - windows
  - linux
---

I hate when things that used to work no longer do and this especially holds for the *basic* stuff.
When I got my new Dell XPS 13 (7390 2-in-1) is was really frustrated by the modern standby implementation it uses by default.
This post explains briefly how to re-enable legacy---but reliable---standby on this and likely other laptop models to prevent overheating.

I never was a big fan of closing all programs and shutting down my laptop (or formerly my desktop) in the evening.
While I was in school and university I mostly used suspend to disk (hibernate) instead of standby, which consumed way more power.
But with increasing battery power the standby penalty became negligible and nowadays I rarely shut down my laptop completely.

My new Dell XPS 13, however, gave me a headache:
After closing the lid or pressing the power button to enter standby I noticed the next day in the morning that the laptop is slightly warm.
Even worse, when putting the laptop in a bag it slowly heated and exited standby to activate cooling on full speed.
A bit of googling revealed that Dell defaults to modern standby for this model.
Maybe this was the same for my previous XPS 13, but it had no overheating problems.

## System Power States

Before focusing on the solution, let's briefly explain the [power states](https://docs.microsoft.com/en-us/windows/win32/power/system-power-states) of computers.

* __S0__: The system is running. All required hardware is powered on, unused components may save power in a low power mode.
* __S0 low power idle__: This state is also called *modern standby*. The system is running in low power mode. Some components may stay powered on, e.g. to keep a network connection. This is similar what cell phones do. A benefit of this power state is that it can resume quickly from standby .
* __S1-S3__: The next three states refer to sleep states where the system appears off. Most components but RAM are powered off. Power usage decreases from S1 to S3. Usually only one of these states is supported by a device.
* __S4__: Hibernate or suspend RAM to disk. This offers the lowest level of power consumption but keeping your apps open.
* __S5__: Soft off, full reboot required.
* __G3__: Mechanical off, full reboot required. No power can be consumed.

The benefits of modern standby are explained in [this article](https://docs.microsoft.com/en-us/windows-hardware/design/device-experiences/modern-standby-vs-s3).
S1-S3 has to be implemented and executed on the firmware (BIOS) level, hence resume is a lot slower in contrast to modern standby.
If a SoC supports low power idle this standby method is preferred.

## Re-enabling S3

If modern standby works as expected there are usually no reasons to disable it unless you are very power-savvy.
But the net if full of complains that modern standby is not reliable.

### Linux

The Arch Linux Wiki covers all [details](https://wiki.archlinux.org/title/Dell_XPS_13_2-in-1_(7390)#S3_Sleep) of how to enable S3.
Basically, you have to add `mem_sleep_default=deep` to your kernel command line.
If you are using systemd-boot as boot manager, just add it to your boot entry `options`.

There is one caveat, the screen sometimes does not wake up.
You have to disable *Early Dell Logo Display* in the BIOS (*POST Behavior > Sign of Life*) to get this fixed.

### Windows

On Windows the story is quite similar, but depends on the used Windows version.
Before you fix it, check which stand-by modes are available by executing `powercfg /a` on the command line.
This will yield an output similar to the following, mentioning that S0 low power idle is in use and S3 is not available:

```batch
The following sleep states are available on this system:
    Standby (S0 Low Power Idle) Network Connected
    Hibernate
    Fast Startup

The following sleep states are not available on this system:
    Standby (S1)
        The system firmware does not support this standby state.
        This standby state is disabled when S0 low power idle is supported.

    Standby (S2)
        The system firmware does not support this standby state.
        This standby state is disabled when S0 low power idle is supported.

    Standby (S3)
        This standby state is disabled when S0 low power idle is supported.

    Hybrid Sleep
        Standby (S3) is not available.
        The hypervisor does not support this standby state.
```

On versions before Windows 20H1 you have to set the [following](https://www.itprotoday.com/mobile-management-and-security/disabling-windows-connected-standby) registry key to zero:

```
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Power]
CsEnabled=0
```

But it seems that Microsoft wants to push modern standby forward and removed this feature.
So after the update to 20H1 I was left with modern standby again. Bummer.
Luckily, In 20H2 Microsoft added back a new [registry hack](https://www.reddit.com/r/Dell/comments/h0r56s/getting_back_s3_sleep_and_disabling_modern/) for enabling S3:

```
[HKLM\System\CurrentControlSet\Control\Power]
PlatformAoAcOverride=0
```

So just add this DWORD and you have S3 back.
`powercfg /a` should yield now the following:


```batch
The following sleep states are available on this system:
    Standby (S3)
    Hibernate
    Fast Startup

The following sleep states are not available on this system:
    Standby (S1)
        The system firmware does not support this standby state.

    Standby (S2)
        The system firmware does not support this standby state.

    Standby (S0 Low Power Idle)
        The system firmware does not support this standby state.

    Hybrid Sleep
        The hypervisor does not support this standby state.
```

Windows 11 also supports S3 via `PlatformAoAcOverride`.
However, you might need to set this setting again after the upgrade.

### The EFI approach

While googling for a solution I also stumbled over [this](https://github.com/ElectronicElephant/Modern-Standby-Byby) idea to fix the problem with an [EFI application](https://www.reddit.com/r/Dell/comments/h0r56s/getting_back_s3_sleep_and_disabling_modern/).
It simply patches the ACPI tables and disables modern standby completely -- regardless of the used operating system.
Drawbacks are that secure boot will no longer work and you obviously have to use a boot manager like rEFInd.
System-d boot does not seem to [support EFI drivers](https://github.com/systemd/systemd/issues/15617).

I did not go this route but patched Linux and Windows separately, but I keep it here for future reference or when Microsoft removes the new registry hack again.
