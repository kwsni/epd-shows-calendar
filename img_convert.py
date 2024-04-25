#!/usr/bin/python3
# -*- coding:utf-8 -*-
# Convert image to fit and retain detail on e-Paper display
from PIL import Image
from PIL.Image import Dither, Resampling
from lib.waveshare_epd import epd3in7
import sys
import os

epd = epd3in7.EPD()
picdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'pic')
img_f = sys.argv[1]
img = Image.open(os.path.join(picdir, img_f))
(width, height) = img.size


if(width > height):
    w_ratio = float(epd.height) / float(width)
    h_ratio = float(epd.width) / float(height)
else:
    w_ratio = float(epd.width) / float(width)
    h_ratio = float(epd.height) / float(height)


if(w_ratio > h_ratio):
    img = img.resize((int(width * h_ratio), int(height * h_ratio)))
else:
    img = img.resize((int(width * w_ratio), int(height * w_ratio)))

(width, height) = img.size

if(height > width):
        img = img.rotate(90, Resampling.NEAREST, 1)
        (width, height) = img.size

if(width == epd.height):
    cvs = Image.new("RGB", (epd.height, epd.width), 0xFFFFFF)
    gap = epd.width - height
    cvs.paste(img, (0, int(gap / 2)))
    img = cvs
else:
    cvs = Image.new("RGB", (epd.height, epd.width), 0xFFFFFF)
    gap = epd.height - width
    cvs.paste(img, (int(gap / 2), 0))
    img = cvs

tmp = Image.new("P",(1, 1))
tmp.putpalette([255,255,255,182,182,182,103,103,103,0,0,0])
img = img.quantize(palette=tmp, dither=Dither.FLOYDSTEINBERG)

img = img.rotate(180) # invert for power connector convenience
img.save(os.path.join(picdir, os.path.splitext(img_f)[0] + "_optimized.bmp"))
