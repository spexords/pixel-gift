import { NgModule } from '@angular/core';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { OrderPreviewFormService } from './order-preview/order-preview-form.service';

@NgModule({
  declarations: [],
  imports: [ShoppingCartRoutingModule],
  providers: [OrderPreviewFormService],
})
export class ShoppingCartModule {}
