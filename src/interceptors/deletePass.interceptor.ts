import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";


@Injectable()
export class DeletePasswordInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        // console.log(request);
        return next.handle().pipe(
            map(data => {
                if(data && typeof data === 'object'){
                    if(Array.isArray(data)){
                        data.forEach(ele => {
                            delete ele.password;
                            delete ele.confirmpassword;
                            delete ele.isAdmin;
                        })
                    }
                    else{
                        delete data.password;
                        delete data.confirmpassword;
                        delete data.isAdmin;
                    }
                }
                return data;
            })
        )
    }

}