import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUserByName',
})
export class FilterUserByNamePipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!value || value.length < 3) return items;
    return items.filter((item) => {
      return item.first_name.toLowerCase().includes(value.toLowerCase());
    });
  }
}
