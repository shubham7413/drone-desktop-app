import sys
from flask import Flask
from flask_cors import cross_origin
from calculator.simple import SimpleCalculator

from plutoComms_copy import COMMS


def calcOp(text):
    """based on the input text, return the operation result"""

    try:
        c = COMMS()
        eval("c." + text + "()")
        return "YES Returning"
    except Exception as e:
        print(e)
        return "NULL"


app = Flask(__name__)


@app.route("/<input>")
@cross_origin()
def calc(input):
    return calcOp(input)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)
