import { Component, OnInit } from '@angular/core';
import { Login } from '../../core/models/login';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

let dataLogin: Login;

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent implements OnInit {
  public nombre: string;
  public contra: string;
  public isActive: boolean;
  public error: boolean = false;

  constructor(private loginService: AuthService) {
    this.nombre = '';
    this.contra = '';
    this.isActive = false;
  }

  ngOnInit(): void { }

  buttonInicioSesion(): void {
    if (this.nombre.trim().length === 0 || this.contra.trim().length === 0) {
      this.error = true;
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
        if (data && data.usuarioId != null) {
          dataLogin = new Login(data.nombreUsuario, data.contrasenna, data.usuarioId);
          sessionStorage.setItem('id', dataLogin.ID.toString());
          sessionStorage.setItem('usuario', dataLogin.usuario);
          this.isActive = true;
          console.log("Inicio de sesión exitoso: " + this.isActive);
        } else {
          console.log("El nombre de usuario o la contraseña son incorrectos: " + this.isActive);
        }
      });

    } else {
      console.log("Buscar" + usuario.length);
    }
  }

  logout() {
    if (this.isActive === true) {
      this.loginService.logout();
      this.isActive = false;
      console.log("Se cerró la sesión correctamente: " + this.isActive);
    } else {
      console.log("No ha iniciado sesión.");
    }
  }

}
