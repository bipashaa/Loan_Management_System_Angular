import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, filteredString: any) {
    if (value.length === 0 || filteredString == null || filteredString == '') {
      return value;
    }

    const loanDetails = [];
    for (const x of value) {
      if (
        x['loanNo'] == filteredString ||
        x['firstName'] == filteredString ||
        x['lastName'] == filteredString
      ) {
        loanDetails.push(x);
      }
    }

    return loanDetails;
  }
}
