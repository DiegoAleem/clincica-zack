import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidatoService } from '../../services/candidato.service';
import { TelefonePipe } from '../../shared/pipes/TelefonePipe';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sou-psicologo',
  styleUrls: ['./sou-psicologo.component.scss'], // Use styleUrls para uma lista de arquivos de estilo
  templateUrl: './sou-psicologo.component.html',
})
export class SouPsicologoComponent implements OnInit {

  @ViewChild('candidatoForm')
  candidatoForm!: NgForm;

  candidato = {
    nome: '',
    email: '',
    telefone: '',
    crp: '',
  };
  curriculo!: File;
  historico?: File;
  enviado = false;
  carregando: boolean = false;

  constructor(private candidatoService: CandidatoService, private toastService: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  navigate(url: string){
    this.router.navigate([url])
  }

  removeSpaces() {
    if (this.candidato.email) {
      this.candidato.email = this.candidato.email.replace(/\s/g, '');
    }
  }

  submitForm() {
    this.carregando = true;
    console.log(this.candidatoForm);
    if ( this.candidatoForm.submitted) {
      if (!this.validateEmail(this.candidato.email)) {
        this.candidatoForm.controls['email'].setErrors({ 'invalidEmail': true });
        this.carregando = false;
        var msgErro = "E-MAIL inválido.";
        var tlErro = "Dados incorretos!";
        this.toastService.error(msgErro, tlErro, {
          timeOut: 7000,
        });
        return;
      }
      if (this.candidato.crp.length !== 8) {
        this.candidatoForm.controls['crp'].setErrors({ 'invalidCRP': true });
        this.carregando = false;
        var msgErro = "CRP inválido.";
        var tlErro = "Dados incorretos!";
        this.toastService.error(msgErro, tlErro, {
          timeOut: 7000,
        });
        return;
      }
      if (this.candidato.telefone.length < 10) {
        this.candidatoForm.controls['telefone'].setErrors({ 'invalidTelefone': true });
        this.carregando = false;
        var msgErro = "TELEFONE inválido.";
        var tlErro = "Dados incorretos!";
        this.toastService.error(msgErro, tlErro, {
          timeOut: 7000,
        });
        return;
      }
  
      const json = JSON.stringify(this.candidato);
      this.candidatoService.registrarCandidato(json, this.curriculo, this.historico != undefined? this.historico : new File([], '')).subscribe(
        response => {
          this.enviado = true;
          this.curriculo = new File([], '', { type: '' });
          this.historico = new File([], '', { type: '' });
          this.toastService.success("Cadastro feito com sucesso! Mais informações por e-mail.", "Sucesso", {
            timeOut: 7000,
          });
          this.carregando = false;
          this.enviado = true;
        },
        error => {
          this.carregando = false; 
          const errorCode = error.status;
          var msgErro = "Tente novamente mais tarde.";
          var tlErro = "Erro inesperado!"; 
          if (errorCode == 404) {
            msgErro = "E-mail ou CRP já cadastrados em nossa base";
            tlErro = "Erro!";
          }
          this.toastService.error(msgErro, tlErro, {
            timeOut: 7000,
          });
        }
      );
    } else {
      this.carregando = false; 
    }
  }

  clearFormErrors() {
    Object.keys(this.candidatoForm.controls).forEach(key => {
      this.candidatoForm.controls[key].setErrors(null);
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  formatTelefone(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const length = value.length;

    if (length <= 10) {
      input.value = value.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
    } else {
      input.value = value.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
    }
  }

  formatCRP(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const length = value.length;

    input.value = value.slice(0, 2) + '/' + value.slice(2, 7);
  }

  onFileChange(event: any, arquivo: string) {
  var file = event.target.files[0];
  const fileControl = this.candidatoForm.controls[arquivo];
  if (file) {
    if (fileControl) {
      // Definir tipos e tamanho permitidos
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 20 * 1024 * 1024; //20MB em bytes

      // Validar tipo de arquivo
      if (!allowedTypes.includes(file.type)) {
        fileControl.setErrors({ fileType: true });
        return;
      }

      // Validar tamanho do arquivo
      if (file.size > maxSize) {
        fileControl.setErrors({ fileSize: true });
        return;
      }

     if(arquivo == 'curriculo') {
      this.curriculo = file;
     } else {
      this.historico = file;
     }
     fileControl.setErrors(null); // Limpar erros se o arquivo for válido
    }
  } else {
    if (fileControl) {
      fileControl.setErrors({ fileType: true });
    }
  }
}
}

@NgModule({
  declarations: [
    SouPsicologoComponent,
    TelefonePipe,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginComponent
  ]
})
export class SouPsicologoModule { }