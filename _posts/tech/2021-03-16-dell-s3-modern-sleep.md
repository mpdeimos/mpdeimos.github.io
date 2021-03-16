
---
layout: post
title:  "Hacking a ZTE ZXDSL-931VII Router"
categories: Tech
image: 
  path: posts/tech/2020-06-05-hacking-zte-zxdsl-931vii/hero.png
  thumbnail: posts/tech/2020-06-05-hacking-zte-zxdsl-931vii/hero.png
tags:
  - windows
---

```batch
C:\Users\mpdeimos>powercfg /a
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

```batch
C:\Users\mpdeimos>powercfg /a
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

    reg add HKLM\System\CurrentControlSet\Control\Power /v PlatformAoAcOverride /t REG_DWORD /d 0

    reg delete  "HKLM\System\CurrentControlSet\Control\Power" /v PlatformAoAcOverride

https://www.itprotoday.com/mobile-management-and-security/disabling-windows-connected-standby

https://answers.microsoft.com/en-us/windows/forum/all/how-to-disable-modern-standby-in-windows-10-may/db950560-33da-4a90-8340-b1f181f5efe6

 -> https://github.com/ElectronicElephant/Modern-Standby-Byby

https://www.rodsbooks.com/refind/drivers.html

https://github.com/systemd/systemd/issues/15617

https://www.reddit.com/r/Dell/comments/h0r56s/getting_back_s3_sleep_and_disabling_modern/
