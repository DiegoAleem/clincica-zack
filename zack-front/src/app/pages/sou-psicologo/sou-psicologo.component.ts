import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
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
  enviado = false;
  carregando: boolean = false;

  constructor(private candidatoService: CandidatoService,  private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  removeSpaces() {
    if (this.candidato.email) {
      this.candidato.email = this.candidato.email.replace(/\s/g, '');
    }
  }

  submitForm() {
    this.carregando = true;
    if (this.candidatoForm.valid && this.candidatoForm.submitted) {
      if (!this.validateEmail(this.candidato.email)) {
        this.candidatoForm.controls['email'].setErrors({ 'invalidEmail': true });
        this.carregando = false;
        return;
      }
      if (this.candidato.crp.length !== 8) {
        this.candidatoForm.controls['crp'].setErrors({ 'invalidCRP': true });
        this.carregando = false;
        return;
      }
      console.log(this.candidato.telefone.length);
      if (this.candidato.telefone.length < 10) {
        this.candidatoForm.controls['telefone'].setErrors({ 'invalidTelefone': true });
        this.carregando = false;
        return;
      }
      const json = JSON.stringify(this.candidato);
      this.candidatoService.registrarCandidato(json, this.curriculo).subscribe(
        response => {
          this.enviado = true;
          this.carregando = false;
          this.curriculo = new File([], '', { type: '' });
          this.toastService.success("Cadastro feito com sucesso!  Mais informações por e-mail.", "Sucesso", {
            timeOut: 7000,
          });
        },
        error => {
          this.carregando = false;
          this.toastService.error("Tente novamente mais tarde.", "Erro inesperado!", {
            timeOut: 7000, 
          });
        }
      );
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.curriculo = file;
      // Verificar se o controle 'curriculo' está definido no NgForm
      if (this.candidatoForm.controls['curriculo']) {
        // Validar tipo de arquivo
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
          this.candidatoForm.controls['curriculo'].setErrors({ fileType: true });
          return;
        }
  
        // Validar tamanho do arquivo (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB em bytes
        if (file.size > maxSize) {
          this.candidatoForm.controls['curriculo'].setErrors({ fileSize: true });
        }
      }
    } else {
      this.candidatoForm.controls['curriculo'].setErrors({ fileType: true });
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