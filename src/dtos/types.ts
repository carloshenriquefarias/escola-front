export interface Aluno {
  id: number;
  nome_aluno: string;
  data_nascimento: string;
  cpf_aluno: string;
  sexo: 'M' | 'F';
  nomePai: string;
  nomeMae: string;
  telefone_responsavel: string;
  etnia: string;
  status: 'Ativo' | 'Inativo';
  bolsa_familia: 0 | 1;
  statusTransporte: '0' | '1';
  numeroMatriculaRede: string;
  numeroInep: string;
  deficiencia: '0' | '1';
  etapaEnsino: string;
  turma: string;
  endereco: string;
  tipoVinculo: string;
  siglaConcessionariaEnergia: string;
  unidadeConsumidora: string;
  turno: 'Matutino' | 'Vespertino' | 'Noturno';
  rota: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  total_alunos: number;
  total_ativos: number;
  total_bolsa_familia: number;
  total_deficiencia: number;
  total_feminino: number;
  total_masculino: number;
  total_inativos: number;
  total_tarde: number;
}