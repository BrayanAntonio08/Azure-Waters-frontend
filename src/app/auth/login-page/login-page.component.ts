import { Component, OnInit } from '@angular/core';
import { Login } from '../../core/models/login';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

let dataLogin: Login;

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ToastrModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent implements OnInit {
  public nombre: string;
  public contra: string;
  public error: boolean = false;

  constructor(private loginService: AuthService, private router: Router, private msg: ToastrService) {
    this.nombre = '';
    this.contra = '';
  }

  ngOnInit(): void {
    if (this.loginService.isAdminActive())
      this.router.navigate(["/admin"]);
  }

  buttonInicioSesion(): void {
    if (this.nombre.trim().length === 0 || this.contra.trim().length === 0) {
      this.error = true;
      this.msg.warning('No se permite datos en blanco');
      return;
    }
    this.error = false;

    console.log(this.nombre);
    console.log(this.contra);
    this.buscarUsuario(this.nombre, this.contra);
  }

  buscarUsuario(usuario: string, contrasenna: string) {
    if (usuario.trim().length !== 0 && contrasenna.trim().length !== 0) {
      this.loginService.login({ usuario, contrasenna }).subscribe((data: any) => {
        console.log(data);
        if (data && data.id != null) {
          dataLogin = new Login(data.nombreUsuario, data.contrasenna, data.id);
          sessionStorage.setItem('id', dataLogin.ID.toString());
          sessionStorage.setItem('usuario', dataLogin.usuario);
          this.loginService.active = true;
          this.msg.success("Inicio de sesión exitoso");
          console.log("Inicio de sesión exitoso: " + this.loginService.active);
          this.router.navigate(['/admin']);
        } else {
          this.msg.warning("El nombre de usuario o la contraseña son incorrectos");
          console.log("El nombre de usuario o la contraseña son incorrectos: " + this.loginService.active);
        }
      });
    } else {
      console.log("Buscar" + usuario.length);
    }
  }

}
