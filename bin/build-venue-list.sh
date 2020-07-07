#!/bin/bash

curl https://raw.githubusercontent.com/hmcts/sscs-common/$COMMON_VERSION/src/main/resources/reference-data/sscs-venues.csv > venues.csv

VENUE_LIST=$(jq -n --raw-input --raw-output '
  [inputs | split(",\"") | select(.[11]=="Yes\"") |
   {
       "LiveFrom":"01/01/2018",
       "ID":"FL_venues",
       "ListElementCode": .[0],
       "ListElement": "\(.[3]), \(.[5]), \(.[6])"
   }]
' < venues.csv)

#Strip square brackets
VENUE_LIST=$(echo "$VENUE_LIST" | sed 's/[][]//g')
#Strip slash quotes
VENUE_LIST=$(echo "$VENUE_LIST" | sed 's/\\"//g')