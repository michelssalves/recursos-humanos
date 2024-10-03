import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { MedicoesComponent } from './components'

export const MedicoesRoutes : Routes = [

  {
    path: 'medicoes',
    redirectTo: 'medicoes/listar'
  },
  {
      path: 'medicoes/listar',
      component : MedicoesComponent
  }


]



