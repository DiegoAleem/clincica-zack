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

  constructor(private candidatoService: CandidatoService,  private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  submitForm() {
    console.log( this.candidato);
    if (this.candidatoForm.valid && this.candidatoForm.submitted) {
      
      const formData = new FormData();
      formData.append('nome', this.candidato.nome);
      formData.append('email', this.candidato.email);
      formData.append('telefone', this.candidato.telefone);
      formData.append('crp', this.candidato.crp);
      const json = JSON.stringify(this.candidato);
      this.candidatoService.registrarCandidato(json, this.curriculo).subscribe(
        response => {
          console.log('Candidato salvo com sucesso!', response);
          // Limpar os campos do formulário após o envio bem sucedido
          this.candidato = {
            nome: '',
            email: '',
            telefone: '',
            crp: '',
          };
          this.curriculo = new File([], '', { type: '' });
          this.toastService.success("Cadastro feito com sucesso!  Mais informações por e-mail.", "Sucesso", {
            timeOut: 7000,
          });
        },
        error => {
          this.toastService.error("Tente novamente mais tarde.", "Erro inesperado!", {
            timeOut: 7000, 
          });
        }
      );
    }
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
      console.log(this.candidatoForm.controls['curriculo']);
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