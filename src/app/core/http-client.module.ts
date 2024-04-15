import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  exports: [HttpClientModule],
  providers: [
    provideHttpClient(withFetch())
  ]
})
export class HttpClientCoreModule {}