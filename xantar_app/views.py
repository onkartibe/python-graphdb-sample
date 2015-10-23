import csv
import random
import json

from django.shortcuts import render
from django.conf import settings
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseRedirect
from django.http import StreamingHttpResponse
from django.views.decorators.cache import cache_control, never_cache
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.views.decorators.http import condition


#for catching ObjectDoesNotExist exceptions
from django.core.exceptions import ObjectDoesNotExist

from models import *

# Create your views here.

# GLOBALS

CURRENCY_MAP = {
    "ARGENTINA": "EAP",
    "AUSTRALIA": "EAD",
    "BAHRAIN": "EBD",
    "BRAZIL": "EBR",
    "CANADA": "ECD",
    "CHINA": "ECY",
    "COLOMBIA": "ECP",
    "EGYPT": "EEP",
    "FRANCE": "EFE",
    "GERMANY": "EGE",
    "INDIA": "EIR",
    "INDONESIA": "EIU",
    "ISRAEL": "EIS",
    "ITALY": "EIE",
    "KUWAIT": "EKD",
    "MEXICO": "EMP",
    "RUSSIA": "ERR",
    "SAUDI ARABIA": "ESR",
    "SOUTH AFRICA": "ESA",
    "SOUTH KOREA": "ESW",
    "SPAIN": "ESE",
    "THAILAND": "ETB",
    "TURKEY": "ETL",
    "UNITED ARAB EMIRATES": "EUA",
    "UNITED KINGDOM": "EUE",
    "UNITED STATES": "EUD",
    "VIETNAM": "EVD"
}


def create_csvdata(filepath):
    document = open(filepath, 'rb+')
    with document as csvfile:
        base_brand_list = []
        base_brand_data = {}
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        row_count = sum(1 for row in reader)

        document.seek(0, 0)
        for row in reader:
            base_brand_list.append(row[11].strip().replace('"', ''))
        base_brand_list = list(set(base_brand_list))

        document.seek(0, 0)
        for y_index, row in enumerate(reader):
            if y_index == row_count - 1:
                base_brand_ids = random.sample(
                    range(100000, 999999), len(base_brand_list))
                base_brand_data = dict(zip(base_brand_list, base_brand_ids))

        document.seek(0, 0)
        for y_index, row in enumerate(reader):
            if y_index > 0:
                adv_data = {}

                if row[13].strip() == 'NEWSPAPERS':
                    adv_data["newspapers_figure"] = int(row[16].strip())
                if row[13].strip() == 'MAGAZINES':
                    adv_data["magazines_figure"] = int(row[16].strip())
                if row[13].strip() == 'TV':
                    adv_data["tv_figure"] = int(row[16].strip())
                if row[13].strip() == 'RADIO':
                    adv_data["radio_figure"] = int(row[16].strip())
                if row[13].strip() == 'CINEMA':
                    adv_data["cinema_figure"] = int(row[16].strip())
                if row[13].strip() == 'OUTDOOR':
                    adv_data["outdoor_figure"] = int(row[16].strip())
                if row[13].strip() == 'INTERNET':
                    adv_data["internet_figure"] = int(row[16].strip())
                adv_data.update({
                    "blank": '',
                    "direct_mail_figure": 0,
                    "data_month": int(row[15] + row[14].zfill(2)),
                    "currency": CURRENCY_MAP[row[2].strip()],
                    "data_factor": '0',
                    "level1_code": row[3],
                    "level2_code": row[4],
                    "level3_code": row[5],
                    "level3_name": row[6],
                })

                ad_data_obj = AdvertisementData.objects.create(**adv_data)
                
                try:
                    adv_obj = AdvertisorData.objects.get(
                        adv_code='n/a', adv_name=row[10])
                except:
                    adv_obj = AdvertisorData.objects.create(
                        adv_code='n/a', adv_name=row[10])

                try:
                    product_obj = Product.objects.get(brand_code=base_brand_data[
                            row[11].strip().replace('"', '')], brand_name=row[11])
                except:
                    product_obj = Product.objects.create(brand_code=base_brand_data[
                            row[11].strip().replace('"', '')], brand_name=row[11])
                
                try:
                    country_obj = Country.objects.get(country=row[2])
                except:
                    country_obj = Country.objects.create(country=row[2])


                country_obj.prod_data.add(product_obj)
                country_obj.save()

                product_obj.adv_data.add(adv_obj)
                product_obj.save()

                adv_obj.advr_data.add(ad_data_obj)
                adv_obj.save()


def get_data(country_id):
    prod_names, prod_data, data, prod_dict = [], [], [], {}
    country_data = []
    country = Country.objects.get(id=country_id)
    prod_list = list(country.prod_data.select_related().all()[:50])
    for prod in prod_list:
        prod_names.append(prod.brand_name)
        adv_list = list(prod.adv_data.select_related().all()[:50])
        for adv in adv_list: 
            prod_data.append(adv.adv_name)
        if prod_names.count(prod.brand_name) > 1:
            prod_dict[prod.brand_name] + list(set(prod_data))
        else:
            prod_dict[prod.brand_name] = list(set(prod_data))
            data.append({prod.brand_name : list(set(prod_data))})
        yield data
        

class ManageInitialData(TemplateView):
    
    template_name = "xantar_app/index.html"

    @never_cache
    @cache_control(no_cache=True, must_revalidate=True, no_store=True)
    def post(self, request, *args, **kwargs):
        prod_data = []
        data = json.loads(request.body)
        country_id = data['country_id']
        data = Country.objects.get(id=country_id)
        product_count = data.prod_data.all().count()
        response_dict = {'product_count':product_count}
        return HttpResponse(json.dumps(response_dict), content_type='application/json')

class ManageCountryData(TemplateView):
    
    template_name = "xantar_app/index.html"

    @never_cache
    @cache_control(no_cache=True, must_revalidate=True, no_store=True)
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body)
        data = Country.objects.get(id=int(request_data['node_id']))
        product_count = data.prod_data.all().count()
        response_dict = {'product_count':product_count}
        return HttpResponse(json.dumps(response_dict), content_type='application/json')


class ManageProductData(TemplateView):

    template_name = "xantar_app/index.html"

    @never_cache
    @cache_control(no_cache=True, must_revalidate=True, no_store=True)
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body)
        data = Product.objects.get(id=int(request_data['node_id']))
        product_brandcode = data.brand_code
        product_brand_name = data.brand_name
        advertisor_count = data.adv_data.all().count()
        response_dict = {'product_brand_name':product_brand_name,
                        'product_brand_code':product_brandcode,
                        'advertisor_count':advertisor_count}
        return HttpResponse(json.dumps(response_dict), content_type='application/json')


class ManageAdvertisorData(TemplateView):

    template_name = "xantar_app/index.html"

    @never_cache
    @cache_control(no_cache=True, must_revalidate=True, no_store=True)
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body)
        data = AdvertisorData.objects.get(id=int(request_data['node_id']))
        advertisement_count = data.advr_data.all().count()
        response_dict = {'advertisor_name':data.adv_name,
                        'advertisor_code':data.adv_code,
                        'advertisementdata_count':advertisement_count}
        return HttpResponse(json.dumps(response_dict), content_type='application/json')


class ManageAdvertisementData(TemplateView):

    template_name = "xantar_app/index.html"

    @never_cache
    @cache_control(no_cache=True, must_revalidate=True, no_store=True)
    def post(self, request, *args, **kwargs):
        data = AdvertisementData.objects.get(id=int(request_data['node_id']))
        response_dict = {'data_month':data.data_month,
                        'data_factor':data.data_factor,
                        'currency':data.currency,
                        'level1_code':data.level1_code,
                        'level2_code':data.level2_code,
                        'level3_code':data.level3_code,
                        'level3_name':data.level3_name}
        return HttpResponse(json.dumps(response_dict), content_type='application/json')
