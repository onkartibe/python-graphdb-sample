import csv
import json
import glob
import StringIO
from openpyxl import Workbook

from django.http import HttpResponse
from xantar_app.models import *

def marketingreport(request):
    request_data = json.loads(request.body)    
    if request_data['report_type'] == 'global':
        country_list = Country.objects.all()
        return write_csv_data(country_list)
    elif request_data['report_type'] == 'current_country':
        country_list = Country.objects.filter(id=request_data['country_id'])
        return write_csv_data(list(country_list))
    else:
        if(request_data['advertisor'] == 'All'):
            country_list = []
            product_obj = Product.objects.filter(brand_code=request_data['brand_code'])
            for each in product_obj:
                country_list +=Country.objects.filter(prod_data=each.id)
            print country_list
            return write_csv_data(list(country_list))
        else:
            product_obj =[]
            country_list = []
            adv_obj = AdvertisorData.objects.filter(adv_name=request_data['advertisor'])
            for each in adv_obj:
                product_obj += Product.objects.filter(adv_data=each.id)
            for each in product_obj:
                country_list += Country.objects.filter(prod_data=each.id)
            print country_list
            return write_csv_data(list(country_list))


def write_csv_data(listdata):
    response = HttpResponse(content_type='text/csv')
    with open('report.csv', 'w') as csvfile:
        writer = csv.writer(response)
        writer.writerow(['COUNTRY', 'BRAND NAME', 'BRAND CODE', 'ADV NAME', 'ADV CODE',
                            'CURRENCY', 'DIRECTMAIL FIGURE', 'NEWSPAPER FIGURE', 'MAGAZINE FIGURE',
                            'TV FIGURE', 'RADIO FIGURE', 'CINEMA FIGURE', 'OUTDOOR FIGURE',
                            'INTERNET FIGURE', 'LEVEL1 CODE', 'LEVEL2 CODE', 'LEVEL3 CODE', 'LEVEL3 NAME'])
        for each in listdata:
            for prod in each.prod_data.all():
                for adv in prod.adv_data.all():
                    for advr in adv.advr_data.all():
                        writer.writerow([each.country, prod.brand_name, prod.brand_code, adv.adv_name, adv.adv_code,
                                            advr.currency,
                                            advr.direct_mail_figure,
                                            advr.newspapers_figure,
                                            advr.magazines_figure,
                                            advr.tv_figure,
                                            advr.radio_figure,
                                            advr.cinema_figure,
                                            advr.outdoor_figure,
                                            advr.internet_figure,
                                            advr.level1_code,
                                            advr.level2_code,
                                            advr.level3_code,
                                            advr.level3_name])
                        csvfile.flush()
    csvfile.close()
    return response
