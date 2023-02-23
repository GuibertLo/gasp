# Extract data from a ODS file to a JSON file

This tool has been built to extract data from an ODS file to JSON data.

## Usage

1. Install the [Pipenv](https://pipenv.pypa.io/en/latest/index.html) environment
```
pipenv install
```

2. Get the *read-ods-with-odfpy* library trough [git](https://git-scm.com/)
```
git clone https://github.com/marcoconti83/read-ods-with-odfpy ODSReader
```

3. Enter into Pipenv and run the script
```
pipenv shell
python ./convert.py -i [input file] -o [output file] 
```
 