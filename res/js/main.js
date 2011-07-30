/** mpdeimos.com - main script */
var Z =
{
	init: function()
	{
		this.navigation.init();
	},
	
	navigation:
	{
		init: function()
		{
			var siteNavigation = Ext.get('siteNavigation');
			if (window.location.pathname.length < 2)
			{
				siteNavigation.child('li').addClass('selected');
				return;
			}
			
			var first = true;
			var found = false;
			siteNavigation.select('a').each(function(e)
			{
				if (first)
				{
					first = false;
					return;
				}
				if (window.location.href.indexOf(e.dom.href) > -1)
				{
					found = true;
					e.parent('li').addClass('selected');
					return true;
				}
			});
			
			if (!found)
			{
				siteNavigation.child('li').addClass('selected');
			}
		}
	}
};

Ext.onReady(Z.init, Z);
