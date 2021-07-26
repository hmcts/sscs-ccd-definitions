#!/usr/bin/env bash

directories=("CaseField" "CaseTypeTab" "State" "CaseEvent" "CaseEventToFields" "SearchInputFields" "SearchResultFields" "WorkBasketInputFields" "WorkBasketResultFields" "AuthorisationCaseField" "AuthorisationCaseEvent" "AuthorisationCaseState")

search_dir="/data/sheets"

for tab in "${directories[@]}"
do
  for file in ${search_dir}/${tab}/*
  do
    if [[ -f $file ]]; then
        #copy stuff ....
        jq '.[].CaseTypeID = "OtherBenefit"' ${file} > /tmp/tmp.json
        jq -s '[.[][]]' ${file} /tmp/tmp.json > /tmp/tmp2.json
        mv /tmp/tmp2.json ${file}
    fi
  done
done