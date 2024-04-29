import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {
  
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      crp: ['', Validators.required],
      sexo: ['', Validators.required],
      valorConsulta: ['', Validators.required],
      isCartao: [true],
      isPix: [true],
      isTransferencia: [true],
      isPlano: [true],
      tempoConsulta1: ['', Validators.required],
      tempoConsulta2: ['', Validators.required],
      atendeCrianca: [true],
      atendeAdolescente: [true],
      atendeAdulto: [true],
      atendeIdoso: [true],
      formacaoECursos: ['', Validators.required],
      sobreMim: ['', Validators.required]
    });
  }

  onSubmit() {
    // Aqui você pode enviar os dados do formulário para o backend
    console.log(this.perfilForm.value);
  }
}