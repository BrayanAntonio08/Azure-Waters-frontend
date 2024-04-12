import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { AuthService } from '../../core/services/auth.service';

let dataLogin: Login;

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent implements OnInit {
  public nombre: string;
  public contra: string;
  public entrar: boolean;
  public error: boolean = false;

  constructor(private loginService: AuthService) {

    this.nombre = '';
    this.contra = '';
    this.entrar = false;

  }

  ngOnInit(): void { }

  buttonInicioSesion(): void {
    if (this.nombre.trim().length === 0 || this.contra.trim().length === 0) {
      this.error = true;
      return;
    }
    this.error = false;

    console.log("Nombre" + this.nombre);
    console.log("Contrasennia" + this.contra);
    this.buscarUsuario(this.nombre, this.contra);

  }

  buscarUsuario(usuario: string, contrasenna: string) {
    if (usuario.trim().length !== 0 && contrasenna.trim().length !== 0) {
      this.loginService.login({ usuario, contrasenna }).subscribe((data: any) => {
        console.log(data);
        dataLogin = new Login(data.usuario, data.contrasenna, data.id);
        if (dataLogin.ID != null) {
          sessionStorage.setItem('id', dataLogin.ID.toString());
          sessionStorage.setItem('usuario', dataLogin.usuario);

        } else {
          console.log("El nombre de usuario o la contraseña son incorrectos");
        }
      });
    } else {
      console.log("Buscar" + usuario.length);
    }
  }
}
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login-page',
//   standalone: true,
//   imports: [],
//   templateUrl: './login-page.component.html',
//   styleUrl: './login-page.component.css'
// })
// export class LoginPageComponent {

// }
