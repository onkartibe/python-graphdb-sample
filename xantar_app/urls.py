from django.conf.urls import patterns, url
from django.conf.urls.static import static
from views import *
from api import *

urlpatterns = patterns('xantar_app.urls',
                   url(r'^$', ManageInitialData.as_view()),
                   url(r'^country_data/$', ManageCountryData.as_view()),
                   url(r'^product_data/$', ManageProductData.as_view()),
                   url(r'^adv_data/$', ManageAdvertisorData.as_view()),
                   url(r'^adv_data_data/$', ManageAdvertisementData.as_view()),
                   url(r'^get/country/details/', ManageMarketingActivityData.as_view()),
	               url(r'^get/marketing/activity/report/',marketingreport),
            ) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
