from django.conf.urls import patterns, url
from django.conf.urls.static import static
from views import *

urlpatterns = patterns('xantar_app.urls',
                   url(r'^$', ManageCountryData.as_view()),
                   url(r'^country_data', ManageCountryData.as_view()),
                   url(r'^product_data/(?P<product_id>[^\.]+)', ManageProductData.as_view()),
                   url(r'^adv_data_data/(?P<adv_data_id>[^\.]+)', ManageAdvertisementData.as_view()),
            ) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
