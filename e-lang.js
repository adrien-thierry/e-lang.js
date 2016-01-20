/*
Copyright (C) 2016  Adrien THIERRY
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
*/

function hSetCookie(cname, cvalue, exdays) 
{
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
} 

!function()
{

  document.Elang = Elang;
  function Elang()
  {
	this.cookie = "_LANG";
    //this.force = "en-EN";
    this.attr = "translate";
    this.default = "en-EN";
    this.path = "../../../js/elang/";
    this.end = ".lang.js";
	
	var lcookie = getCookie(this.cookie);
    this.userlang = this.force || lcookie || navigator.language || navigator.userLanguage || this.default;

    if(document.querySelectorAll === undefined)
    {
      this.find = function()
      {
        var allElements = document.getElementsByTagName('*');
        var ret = [];
        for (var i = 0; i < allElements.length; i++)
         {
          if (allElements[i].getAttribute(this.attr) !== undefined && allElements[i].getAttribute(this.attr) != null)
          {
            ret.push(allElements[i]);
          }
        }
        return ret;
      }
    }
    else
    {
      this.find = function()
      {
         return document.querySelectorAll("[" + this.attr + "]");
      }
    }


    this.ajaxRequest = function()
    {
     var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
     if (window.ActiveXObject)
     {
      for (var i=0; i<activexmodes.length; i++)
      {
       try
       {
        return new ActiveXObject(activexmodes[i]);
       }
       catch(e){}
      }
     }
     else if (window.XMLHttpRequest)
      return new XMLHttpRequest();
     else
      return false;
    }

    this.ajaxget = function(target)
    {
        var getrequest=new this.ajaxRequest();
        getrequest.onreadystatechange=function()
        {
         if (getrequest.readyState==4)
         {
          if (getrequest.status==200 || window.location.href.indexOf("http")==-1)
          {
            try
            {
              var obj = JSON.parse(getrequest.responseText);
              applyLang(obj);
            }
            catch(e)
			{
              getDefaultLanguage();
            }
          }
          else
          {
            getDefaultLanguage();
          }
         }
        }
        getrequest.open("GET", target, true);
        getrequest.send(null);
    }

    this.getLanguage = function()
    {
      this.ajaxget(this.path + this.userlang + this.end);
    }
	
	
	 function getCookie(cname) 
	  {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) 
			{
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
			}
			return "";
		} 
  }

    var applyLang = function(obj)
    {
      var elang = new Elang();
      var el = elang.find();
      var j = el.length;
      for(var i = 0; i < j; i++)
      {
        var trad = el[i].getAttribute(elang.attr);
        if(obj[trad] !== undefined && obj[trad] != null)
        {
           el[i].innerHTML = obj[trad];
        }
      }
    }
    var getDefaultLanguage = function()
    {
      var elang = new Elang();
      if(elang.default !== undefined)
      {
         elang.ajaxget(elang.path + elang.default + elang.end);
      }
    }

  var lang = new Elang();
  lang.getLanguage();

}();
