# mpdeimos.com main script

class Z
	constructor: ->
		new Z.Navigation

	@Navigation: class
		constructor: ->
			siteNavigation = Ext.get("siteNavigation")

			return siteNavigation.child('li').addClass('selected') if window.location.pathname.length < 2

			first = true;
			found = false;

			# TODO try using [1..] maybe w/ another ext command or ditch ext at all... in favour of bootstrap/ender
			siteNavigation.select('a').each (e) ->
				return first = false if first

				if window.location.href.indexOf(e.dom.href) > -1
					found = true;
					e.parent('li').addClass('selected');
					return true

			siteNavigation.child('li').addClass('selected') if not found

this.Z = new Z