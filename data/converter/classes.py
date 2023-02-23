from enum import Enum


class CellException(Exception):
    Exception.args


class ArgumentException(Exception):
    Exception.args


class SHEETS(Enum):
    categories = "categories"
    subcategories = "subcategories"
    objectives = "objectives"
    items = "items"
    descriptions = "descriptions"


class ATTRIBUTES(Enum):
    id = "id"
    name = "name"

    category = "category"
    description = "description"
    PK = "PK"

    subcategory = "subcategory"

    objective = "objective"

    topic = "topic"
    probability = "probability"
    severity = "severity"
    risk = "risk"
    requirement = "requirement"
    remarks = "remarks"

    item = "item"
    value = "value"
    link = "link"
    alt = "alt"


class CELL_TYPES(Enum):
    index = 1
    string = 2
    PK2 = 3
    PK3 = 4
    topic = 5
    probability = 6
    severity = 7
    risk = 8
    requirement = 9
    PK4 = 10
    link = 11
    emptyString = 12
    PK5 = 13
