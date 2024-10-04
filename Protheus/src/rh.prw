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
   //u_menuRH()
   u_datanova()
   RpcClearEnv()

Return


User Function datanova()

Local cdata := ''
Local cMes := ''

cdata := MONTH(STOD("20240930"))

cMes := "COUNT(ZA7.ZA7_MES"+cValToChar(MONTH(STOD("20240930")))+") AS ORCAMENTO"


Return
