import { NgModule } from '@angular/core';
import { Routes, RouterModule,ExtraOptions } from '@angular/router';


import { Setting1Component } from './components/setting1/setting1.component';
import { Setting2Component } from './components/setting2/setting2.component';
import { Setting3Component } from './components/setting3/setting3.component';

const routes: Routes = [
   
    // {path: '', component: HomepageComponent},
    
  
    {path: 'setting1', component: Setting1Component},
    {path: 'setting2', component: Setting2Component},
    {path: 'setting3', component: Setting3Component},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }