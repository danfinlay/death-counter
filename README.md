# Death Counter 2014

Counting causes of death from the CDC's dataset.

The output for 2014 is this:
```
[
  {
    "name": "Pending investigation",
    "count": 3703
  },
  {
    "name": "Could not determine",
    "count": 10838
  },
  {
    "name": "Homicide",
    "count": 16840
  },
  {
    "name": "Suicide",
    "count": 43139
  },
  {
    "name": "Accident",
    "count": 132684
  },
  {
    "name": "Not specified",
    "count": 364034
  },
  {
    "name": "Natural",
    "count": 2059933
  }
]
```

The included CSV was originally a `DUSMCPUB` file found [here](http://www.cdc.gov/nchs/data_access/vitalstatsonline.htm)

That database was parsed with [this parser](https://github.com/tommaho/VS13MORT.DUSMCPUB-Parser).

The causes of death for the cause codes found in that database were found in [this document](http://www.cdc.gov/nchs/data/dvs/Record_Layout_2014.pdf), and encoded in the file header.

To run this script, have `node.js` installed, run `npm install` in this folder, and then run `npm start`.
