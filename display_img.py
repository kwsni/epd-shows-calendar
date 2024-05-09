#!/usr/bin/python3
# -*- coding:utf-8 -*-
import sys
import os
picdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'images')
libdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import logging
from lib.waveshare_epd import epd3in7
from datetime import datetime
from PIL import Image

logging.basicConfig(level=logging.DEBUG)

localeTZ = datetime.now().tzinfo
img_f = sys.argv[1]

try:
    logging.info("e-Paper Display Test")
    epd = epd3in7.EPD()
    
    logging.info("init and Clear")
    epd.init(0)
    epd.Clear(0xFF, 0)

    logging.info("Display image")
    img = Image.open(os.path.join(picdir, img_f))

    epd.display_4Gray(epd.getbuffer_4Gray(img))

    logging.info("Goto Sleep...")
    epd.sleep()
    
except IOError as e:
    logging.info(e)

except KeyboardInterrupt:
    logging.info("ctrl + c:")
    epd3in7.epdconfig.module_exit(cleanup=True)
    exit()