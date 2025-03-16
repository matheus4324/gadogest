import mongoose, { Document, Schema } from 'mongoose';

// Interface para registro de saúde
export interface ISaudeAnimal extends Document {
  animal: mongoose.Types.ObjectId;
  tipo: string;
  data: Date;
  produto?: string;
  dosagem?: string;
  aplicador: string;
  veterinario?: string;
  observacoes?: string;
  status: string;
  proximaAplicacao?: Date;
  dataCadastro: Date;
  custo?: number;
}

// Esquema do registro de saúde
const SaudeAnimalSchema = new Schema<ISaudeAnimal>({
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: [true, 'Por favor, informe o animal']
  },
  tipo: {
    type: String,
    required: [true, 'Por favor, informe o tipo de procedimento'],
    enum: ['Vacinação', 'Medicação', 'Exame', 'Cirurgia', 'Outro'],
    trim: true
  },
  data: {
    type: Date,
    required: [true, 'Por favor, informe a data do procedimento'],
    default: Date.now
  },
  produto: {
    type: String,
    trim: true
  },
  dosagem: {
    type: String,
    trim: true
  },
  aplicador: {
    type: String,
    required: [true, 'Por favor, informe quem aplicou o procedimento'],
    trim: true
  },
  veterinario: {
    type: String,
    trim: true
  },
  observacoes: {
    type: String,
    maxlength: [1000, 'Observações não podem ter mais de 1000 caracteres']
  },
  status: {
    type: String,
    required: [true, 'Por favor, informe o status do procedimento'],
    enum: ['Agendado', 'Realizado', 'Cancelado'],
    default: 'Realizado'
  },
  proximaAplicacao: {
    type: Date
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  custo: {
    type: Number
  }
});

// Índice para melhorar a performance de consultas por data
SaudeAnimalSchema.index({ animal: 1, data: -1 });

// Índice para consultas de procedimentos pendentes
SaudeAnimalSchema.index({ status: 1, proximaAplicacao: 1 });

// Verifica se o modelo já existe para evitar erro de compilação
const SaudeAnimal = mongoose.models.SaudeAnimal || mongoose.model<ISaudeAnimal>('SaudeAnimal', SaudeAnimalSchema);

export default SaudeAnimal; 