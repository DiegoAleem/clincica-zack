import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const phoneNumber = value.replace(/\D/g, ''); // Remover caracteres não numéricos
    const formattedPhoneNumber = phoneNumber.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');

    return formattedPhoneNumber;
  }
}