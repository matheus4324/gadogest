import mongoose, { Document, Schema } from 'mongoose';

// Interface para registro financeiro
export interface IFinanceiro extends Document {
  tipo: 'Receita' | 'Despesa';
  categoria: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: string;
  status: string;
  animal?: mongoose.Types.ObjectId;
  documentoFiscal?: string;
  observacoes?: string;
  anexo?: string;
  fazenda: string;
  dataCadastro: Date;
  responsavel: string;
}

// Esquema do registro financeiro
const FinanceiroSchema = new Schema<IFinanceiro>({
  tipo: {
    type: String,
    required: [true, 'Por favor, informe o tipo da movimentação'],
    enum: ['Receita', 'Despesa'],
    trim: true
  },
  categoria: {
    type: String,
    required: [true, 'Por favor, informe a categoria'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'Por favor, informe a descrição'],
    trim: true,
    maxlength: [200, 'Descrição não pode ter mais de 200 caracteres']
  },
  valor: {
    type: Number,
    required: [true, 'Por favor, informe o valor']
  },
  data: {
    type: Date,
    required: [true, 'Por favor, informe a data'],
    default: Date.now
  },
  formaPagamento: {
    type: String,
    required: [true, 'Por favor, informe a forma de pagamento'],
    enum: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Transferência', 'Boleto', 'Cheque', 'Outro'],
    default: 'Dinheiro'
  },
  status: {
    type: String,
    required: [true, 'Por favor, informe o status'],
    enum: ['Pendente', 'Pago', 'Cancelado'],
    default: 'Pago'
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal'
  },
  documentoFiscal: {
    type: String,
    trim: true
  },
  observacoes: {
    type: String,
    maxlength: [1000, 'Observações não podem ter mais de 1000 caracteres']
  },
  anexo: {
    type: String // caminho do arquivo
  },
  fazenda: {
    type: String,
    required: [true, 'Por favor, informe a fazenda']
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  responsavel: {
    type: String,
    required: [true, 'Por favor, informe o responsável'],
    trim: true
  }
});

// Índice para melhorar a performance de consultas
FinanceiroSchema.index({ fazenda: 1, data: -1 });
FinanceiroSchema.index({ tipo: 1, categoria: 1 });
FinanceiroSchema.index({ status: 1 });

// Verifica se o modelo já existe para evitar erro de compilação
const Financeiro = mongoose.models.Financeiro || mongoose.model<IFinanceiro>('Financeiro', FinanceiroSchema);

export default Financeiro; 