import { Pipe, PipeTransform } from '@angular/core';

type Sorting = "asc" | "desc";

@Pipe({
  name: 'sortCustom',
  standalone: true,
})
export class SortPipe implements PipeTransform {

  transform(data: any[], key: string, method: Sorting): any {
    if (method == 'asc') {
      return data.sort((a, b) => a[key] > b[key] ? 1 : -1);
    } else {
      return data.sort((a, b) => a[key] < b[key] ? 1 : -1);
    }
  }

}
