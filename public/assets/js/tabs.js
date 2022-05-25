
     jQuery(document).ready(function() {
          var changeTab = function(id) {
              // Show/Hide Tabs
              jQuery('.tab-content #' + id).show().siblings().hide();

              // Change/remove current tab to active
              jQuery('.tab-content #' + id + ':visible').addClass("active").siblings().removeClass('active');
          };

          jQuery('.tabs .tab-links a').on('click', function(e)  {
              e.preventDefault();
              // Here you will get the tab id, comming from the clicked hyperlink
              var currentAttrValue = jQuery(this).attr('href').split("#")[1];
              // Change/remove current tab to active
              jQuery(this).parents("li").addClass("active").siblings().removeClass('active');
              changeTab(currentAttrValue);
          });
        
          var tab = document.location.href.split("#");
          if(tab.length > 0) {
            var id = tab[1];
            jQuery('.tabs .tab-links a[href="#' + id + '"]').click();
            window.addEventListener("load",function() {
              jQuery(window).scrollTop(0);
            },true);
          }
      });