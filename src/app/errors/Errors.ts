import { throwError } from "rxjs"

export class Errors {

    appError(error: any) {
        let messageError: any = ''
        if (error.error instanceof ErrorEvent) {
            messageError = error.error.message
        } 
        else {
            messageError = `Código do Erro: ${error.status}\n
            Mensagem do erro é: ${error.message}`
        }
        alert(messageError)
        return throwError(() => {
            messageError
        })
    }
}