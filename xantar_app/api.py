import csv
import json
import os

from reportlab.lib import colors
from reportlab.lib.pagesizes import A1, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle

from django.conf import settings
from django.core.servers.basehttp import FileWrapper
from django.http import HttpResponse
from xantar_app.models import *

def marketingreport(request):
    request_data = json.loads(request.body)
    if request_data['report_type'] == 'global':
        country_list = Country.objects.all()
        if request_data['file_type'] =='PDF':
            return write_pdf_data(country_list)
        else:
            return write_csv_data(country_list)
    elif request_data['report_type'] == 'current_country':
        country_list = Country.objects.filter(id=request_data['country_id'])
        if request_data['file_type'] == 'PDF':
            return write_pdf_data(country_list)
        else:
            return write_csv_data(country_list)
    else:
        if request_data['advertisor'] == 'All':
            country_list = []
            product_obj = Product.objects.filter(brand_code=request_data['brand_code'])
            for each in product_obj:
                country_list += Country.objects.filter(prod_data=each.id)
            if request_data['file_type'] == 'PDF':
                return write_pdf_data(country_list)
            else:
                return write_csv_data(country_list)
        else:
            product_obj = []
            country_list = []
            adv_obj = AdvertisorData.objects.filter(adv_name=request_data['advertisor'])
            for each in adv_obj:
                product_obj += Product.objects.filter(adv_data=each.id)
            for each in product_obj:
                country_list += Country.objects.filter(prod_data=each.id)
            if request_data['file_type'] == 'PDF':
                return write_pdf_data(country_list)
            else:
                return write_csv_data(country_list)


def write_csv_data(listdata):
    response = HttpResponse(content_type='text/csv')
    with open('report.csv', 'w') as csvfile:
        writer = csv.writer(response)
        writer.writerow(['COUNTRY', 'BRAND NAME', 'BRAND CODE', 'ADV NAME',
                            'ADV CODE','CURRENCY', 'DIRECTMAIL FIGURE',
                            'NEWSPAPER FIGURE', 'MAGAZINE FIGURE',
                            'TV FIGURE', 'RADIO FIGURE', 'CINEMA FIGURE',
                            'OUTDOOR FIGURE','INTERNET FIGURE', 'LEVEL1 CODE',
                            'LEVEL2 CODE', 'LEVEL3 CODE', 'LEVEL3 NAME'])
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

def write_pdf_data(listdata):
    report_data = []
    pdffile = SimpleDocTemplate("report.pdf", pagesize=A1, rightMargin=10,leftMargin=10, topMargin=20,bottomMargin=10)
    pdffile.pagesize = landscape(A1)
    elements = []
    style = TableStyle([('ALIGN', (1, 1), (-2, -2), 'RIGHT'),
                       ('TEXTCOLOR', (1, 1), (-2, -2), colors.red),
                       ('VALIGN', (0, 0), (0, -1), 'TOP'),
                       ('TEXTCOLOR', (0, 0), (0, -1), colors.blue),
                       ('ALIGN', (0, -1), (-1, -1), 'CENTER'),
                       ('VALIGN', (0, -1), (-1, -1), 'MIDDLE'),
                       ('TEXTCOLOR', (0, -1), (-1, -1), colors.green),
                       ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),
                       ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
                       ])
    pdfsheet = getSampleStyleSheet()
    pdfsheet = pdfsheet["BodyText"]
    pdfsheet.wordWrap = 'CJK'
    fntstyle = ParagraphStyle(name='Helvetica-Bold')
    fntstyle.fontSize = 10
    report_data = [['COUNTRY', 'BRAND NAME', 'BRAND CODE', 'ADV NAME',
                            'ADV CODE','CURRENCY', 'DIRECTMAIL FIGURE',
                            'NEWSPAPER FIGURE', 'MAGAZINE FIGURE',
                            'TV FIGURE', 'RADIO FIGURE', 'CINEMA FIGURE',
                            'OUTDOOR FIGURE','INTERNET FIGURE', 'LEVEL1 CODE',
                            'LEVEL2 CODE', 'LEVEL3 CODE', 'LEVEL3 NAME']]
    for each in listdata:
        for prod in each.prod_data.all():
            for adv in prod.adv_data.all():
                for advr in adv.advr_data.all():
                    report_data.append([each.country,
                                        prod.brand_name,
                                        str(prod.brand_code),
                                        adv.adv_name,
                                        adv.adv_code,
                                        advr.currency,
                                        str(advr.direct_mail_figure),
                                        str(advr.newspapers_figure),
                                        str(advr.magazines_figure),
                                        str(advr.tv_figure),
                                        str(advr.radio_figure),
                                        str(advr.cinema_figure),
                                        str(advr.outdoor_figure),
                                        str(advr.internet_figure),
                                        advr.level1_code,
                                        advr.level2_code,
                                        advr.level3_code,
                                        advr.level3_name])
    report_data_table = [[Paragraph(cell, pdfsheet)
                            for cell in row] for row in report_data]
    table_view = Table(report_data_table)
    table_view.setStyle(style)
    elements.append(table_view)
    pdffile.build(elements)
    wrapper = FileWrapper(file("report.pdf"))
    response = HttpResponse(wrapper, content_type='text/plain')
    response['Content-Length'] = os.path.getsize("report.pdf")
    return response

def upload_file(request):
    files = request.POST['file']
    file_data = request.POST['file_data']
    splitfilepath = files.decode("utf-8").split('\\')
    filename = splitfilepath[-1]
    filepath = os.path.join(settings.MEDIA_ROOT,'report_data')
    try:
        print os.stat(filepath)
    except:
        os.mkdir(filepath)
    abs_path = os.path.join(filepath, filename)
    destination = open(abs_path, "wb+")
    for chunk in file_data:
        destination.write(chunk)
    destination.close()
    return HttpResponse("File successfully uploaded")

def clean_file(request,destination):
    with open(str(destination),"wb+") as file_data:
        for line in file_data.readlines():
            if line.rstrip():
                print line
    file_data.close()
    return HttpResponse("Cleaning file done")
