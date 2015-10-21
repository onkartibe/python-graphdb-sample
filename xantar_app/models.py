# # Create your models here.
from neo4django.db import models

class Country(models.NodeModel):
    country = models.StringProperty()
    region = models.Relationship('self', rel_type='friends_with')


class Product(models.NodeModel):
    brand_code = models.StringProperty()
    brand_name = models.StringProperty()
    country = models.Relationship(
        Country, rel_type='owns', related_name='prod_data')

class AdvertisorData(models.NodeModel):
    adv_code = models.StringProperty()
    adv_name = models.StringProperty()
    product = models.Relationship(
        Product, rel_type='owns', related_name='adv_data')

class AdvertisementData(models.NodeModel):
    blank = models.StringProperty()
    direct_mail_figure = models.IntegerProperty()
    data_month = models.IntegerProperty()
    currency = models.StringProperty()
    data_factor = models.StringProperty()
    newspapers_figure = models.IntegerProperty()
    magazines_figure = models.IntegerProperty()
    tv_figure = models.IntegerProperty()
    radio_figure = models.IntegerProperty()
    cinema_figure = models.IntegerProperty()
    outdoor_figure = models.IntegerProperty()
    internet_figure = models.IntegerProperty()
    level1_code = models.StringProperty()
    level2_code = models.StringProperty()
    level3_code = models.StringProperty()
    level3_name = models.StringProperty()

    advr_data = models.Relationship(
        AdvertisorData, rel_type='owns', related_name='advr_data')
