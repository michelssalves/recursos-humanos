#include "protheus.ch"
#INCLUDE 'totvs.ch'
#INCLUDE 'restful.ch'
#INCLUDE "topconn.ch"

User Function menuRH()

    FwCallApp("recursos-humanos")

Return 

User Function recursosHumanos()

   RpcClearenv()
   RPCSetType(3)
   RpcSetEnv('02')
   u_menuRH()
   RpcClearEnv()

Return
