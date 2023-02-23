# https://github.com/marcoconti83/read-ods-with-odfpy
from ODSReader.ODSReader import ODSReader

import json
import os
import hashlib
import re
import sys
import getopt

from classes import SHEETS, ATTRIBUTES, CELL_TYPES
from classes import CellException, ArgumentException


# A PK must be composed of indexes with a fixed length depending on the object type
def verifyPK(pk, length):
    if pk is None:
        raise CellException("PK must not be empty.")
    indexes = pk.split(".")
    if len(indexes) == length:
        for index in indexes:
            if verifyIndex(index) is None:
                raise CellException("PK not valid for the object type.")
    else:
        raise CellException("PK has not a valid format.")
    return pk


# An index must be a positive natural number
def verifyIndex(value):
    try:
        number = int(value)
        if number <= 0:
            raise CellException("Value is not a valid number.")
        else:
            return number
    except ValueError:
        raise CellException("Can not convert value to a number.")
    except TypeError:
        raise CellException("Can not convert value to a number.")


# Depending on the attribute and sheet, each value must be tested
def integrity(activeSheet, attribute, value):
    # Finding the correct sheet and applying cell type if matched
    if activeSheet == SHEETS.categories:
        if attribute == ATTRIBUTES.id.value:
            cellType = CELL_TYPES.index
        elif attribute == ATTRIBUTES.name.value:
            cellType = CELL_TYPES.string
        # Attribute not concerned
        else:
            # skip this attribute
            return None

    elif activeSheet == SHEETS.subcategories:
        if attribute == ATTRIBUTES.category.value:
            cellType = CELL_TYPES.index
        elif attribute == ATTRIBUTES.id.value:
            cellType = CELL_TYPES.index
        elif attribute == ATTRIBUTES.name.value:
            cellType = CELL_TYPES.string
        elif attribute == ATTRIBUTES.description.value:
            cellType = CELL_TYPES.string
        elif attribute == ATTRIBUTES.PK.value:
            cellType = CELL_TYPES.PK2
        # Attribute not concerned
        else:
            # skip this attribute
            return None

    elif activeSheet == SHEETS.objectives:
        if attribute == ATTRIBUTES.subcategory.value:
            cellType = CELL_TYPES.PK2
        elif attribute == ATTRIBUTES.id.value:
            cellType = CELL_TYPES.index
        elif attribute == ATTRIBUTES.name.value:
            cellType = CELL_TYPES.string
        elif attribute == ATTRIBUTES.PK.value:
            cellType = CELL_TYPES.PK3
        # Attribute not concerned
        else:
            # skip this attribute
            return None

    elif activeSheet == SHEETS.items:
        if attribute == ATTRIBUTES.objective.value:
            cellType = CELL_TYPES.PK3
        elif attribute == ATTRIBUTES.id.value:
            cellType = CELL_TYPES.index
        elif attribute == ATTRIBUTES.name.value:
            cellType = CELL_TYPES.string
        elif attribute == ATTRIBUTES.topic.value:
            cellType = CELL_TYPES.topic
        elif attribute == ATTRIBUTES.probability.value:
            cellType = CELL_TYPES.probability
        elif attribute == ATTRIBUTES.severity.value:
            cellType = CELL_TYPES.severity
        elif attribute == ATTRIBUTES.risk.value:
            cellType = CELL_TYPES.risk
        elif attribute == ATTRIBUTES.requirement.value:
            cellType = CELL_TYPES.requirement
        elif attribute == ATTRIBUTES.PK.value:
            cellType = CELL_TYPES.PK4
        elif attribute == ATTRIBUTES.remarks.value:
            cellType = CELL_TYPES.emptyString
        # Attribute not concerned
        else:
            # skip this attribute
            return None

    elif activeSheet == SHEETS.descriptions:
        if attribute == ATTRIBUTES.item.value:
            cellType = CELL_TYPES.PK4
        elif attribute == ATTRIBUTES.id.value:
            cellType = CELL_TYPES.index
        elif attribute == ATTRIBUTES.name.value:
            cellType = CELL_TYPES.string
        elif attribute == ATTRIBUTES.value.value:
            cellType = CELL_TYPES.string
        elif attribute == ATTRIBUTES.link.value:
            cellType = CELL_TYPES.link
        elif attribute == ATTRIBUTES.alt.value:
            cellType = CELL_TYPES.emptyString
        elif attribute == ATTRIBUTES.PK.value:
            cellType = CELL_TYPES.PK5
        # Attribute not concerned
        else:
            # skip this attribute
            return None

    # Sheet out of bound
    else:
        # skip this sheet
        return None

    # test the types
    if cellType == CELL_TYPES.index:
        return verifyIndex(value)
    elif cellType == CELL_TYPES.string:
        if isinstance(value, str):
            # Value is not a string
            return value
        else:
            raise CellException("Value must be a string")
    elif cellType == CELL_TYPES.topic:
        # Must be one of those values
        if value in ["S", "P", "SP", "PS", "s", "p", "sp", "ps"]:
            return value
        else:
            raise CellException("Value must either be S, P, SP, PS, s, p, sp, ps.")
    elif cellType == CELL_TYPES.PK2:
        return verifyPK(value, 2)
    elif cellType == CELL_TYPES.PK3:
        return verifyPK(value, 3)
    elif cellType == CELL_TYPES.PK4:
        return verifyPK(value, 4)
    elif cellType == CELL_TYPES.PK5:
        return verifyPK(value, 5)
    elif cellType == CELL_TYPES.probability or cellType == CELL_TYPES.severity:
        number = verifyIndex(value)
        if 1 <= number <= 5:
            return number
        else:
            raise CellException("Value must be a positive number between 1 and 5.")
    elif cellType == CELL_TYPES.risk:
        number = verifyIndex(value)
        if 1 <= number <= 25:
            return number
        else:
            raise CellException("Value must be a positive number between 1 and 25.")
    elif cellType == CELL_TYPES.requirement:
        # Must be one of those values
        if value in ["m", "M", "S", "s", "C", "c"]:
            return value.lower()
        else:
            raise CellException("Value must either be M, S, C, m, s, c.")
    elif cellType == CELL_TYPES.link:
        # Must be a valid link
        # https://stackoverflow.com/questions/7160737/how-to-validate-a-url-in-python-malformed-or-not
        if value is None:
            return ""
        regex = re.compile(
            r'^(?:http|ftp)s?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ip
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        if re.match(regex, value):
            return value
        else:
            raise CellException("Value must be a valid link.")
    elif cellType == CELL_TYPES.emptyString:
        if value is None:
            return ""
        elif isinstance(value, str):
            return value
        else:
            raise CellException("Value must be a string.")
    # Type out of bound
    else:
        raise CellException("Type is out of bound.")


# Method that extracts data from one sheet
def readSheet(ods, activeSheet, output):
    sheetName = activeSheet.value
    # Select the sheet
    arrays = ods.getSheet(sheetName)
    print("Getting the " + sheetName + " sheet...")
    # Extracting attributes from data (first column)
    attributes = arrays[0]
    # Creating variable to receive data by their index and attributes
    dictionary = [dict() for i in range(len(arrays) - 1)]
    # Iterate on each record
    for i, row in enumerate(arrays[1:]):
        # Iterate on each attribute
        for attribute in range(len(attributes)):
            # Avoid error if last column of row is empty
            if attribute < len(row):
                cell = row[attribute]
            else:
                cell = None

            try:
                # Run the integrity test
                verified = integrity(activeSheet, attributes[attribute], cell)
                if verified:
                    # store value if inside the guide content scope
                    dictionary[i][attributes[attribute]] = verified
            except CellException as msg:
                print("Error in sheet " + sheetName + " for attribute " + attributes[attribute] + ", value '" + str(cell) + "' is invalid! (line " + str(i + 2) + ")")
                print(msg)
                quit()

    # Save results
    output[sheetName] = dictionary
    print(sheetName + " extracted.")
    print("-------------------------------")


def main(argv):

    try:
        # Argument management
        # https://opensourceoptions.com/blog/how-to-pass-arguments-to-a-python-script-from-the-command-line/
        arg_input = ""
        arg_output = ""
        arg_help = "{0} -i <input> -o <output>".format(argv[0])

        opts, args = getopt.getopt(argv[1:], "hi:u:o:", ["help", "input=", "output="])

        for opt, arg in opts:
            if opt in ("-h", "--help"):
                # prints the help message and quit
                print(arg_help)
                sys.exit(2)
            elif opt in ("-i", "--input"):
                arg_input = arg
            elif opt in ("-o", "--output"):
                arg_output = arg

        # making sure that each argument is not empty
        if not arg_input:
            raise ArgumentException("The input argument is empty.")
        if not arg_output:
            raise ArgumentException("The output argument is empty.")

        # Read the data
        odsFile = ODSReader(arg_input)

        # Prepare the structure for all JSON attributes
        output = dict()

        # Extract all sheets
        for sheet in SHEETS:
            readSheet(odsFile, sheet, output)

        # Compute hash
        output["hash"] = hashlib.sha512(json.dumps(output).encode('utf-8')).hexdigest()

        # Write the JSON file
        fp = open(arg_output, 'w')
        fp.write(json.dumps(output))
        print("Export finished.")

    # Error management, with additional print of each Exception type
    except ArgumentException as msg:
        print("An error occurred when reading the arguments.")
        print(msg)
        print(arg_help)
    except OSError as msg:
        print("Problem while reading the ods file, or creating the json file, or while creating the JSON file.")
        print(msg)
    except getopt.GetoptError:
        print("One specified argument is not valid. Please check the correct format below.")
        print(arg_help)
    except Exception as msg:
        print("An unknown problem occurred.")
        print(msg)
    finally:
        quit()


# Run the main function of the script, with the arguments
if __name__ == '__main__':
    sys.exit(main(sys.argv))
