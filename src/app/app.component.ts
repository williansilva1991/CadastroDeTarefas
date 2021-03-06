import { Component } from '@angular/core';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Todo } from './models/todo.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   public todos : Todo[] = [];
   public title : string = 'Minhas tarefas';

   public  form: FormGroup;

   constructor(private fb: FormBuilder){
     this.form = this.fb.group({
        title:['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(70),
          Validators.required
        ])]
     });

     this.todos.push(new Todo(1, 'Passear com cachorro', false));
     this.todos.push(new Todo(2, 'Ir ao suérmercado', false));
     this.todos.push(new Todo(3, 'Cortar cabelo', true));

     this.load();
   }

   alterarTexto(){
     this.title = 'Teste';
   }


   remove(todo: Todo){
     const index = this.todos.indexOf(todo);
     if(index !== -1){
       this.todos.splice(index, 1);
     }
     this.save();

   }

   markAsDone(todo :Todo){
      todo.done = true;
      this.save();
   }

   markAsUnDone(todo : Todo){
      todo.done = false;
      this.save();
   }

   add(){
     const title = this.form.controls["title"].value;
     const id = this.todos.length + 1;
     this.todos.push(new Todo(id, title, false));
     this.save();
     this.clear();
   }


   clear(){
     this.form.reset();
   }

   save(){
     const data  = JSON.stringify(this.todos);
     localStorage.setItem('todos',data);
   }


   load(){
     const data = localStorage.getItem('todos');
     if(data){
       this.todos = JSON.parse(data);
       
     }else{
        this.todos = [];
     }

   }
}
