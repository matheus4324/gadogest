import mongoose, { Document, Schema } from 'mongoose';

// Interface para o animal
export interface IAnimal extends Document {
  identificacao: string;
  tipo: string;
  raca: string;
  dataNascimento: Date;
  sexo: string;
  peso: number;
  altura?: number;
  status: string;
  mae?: mongoose.Types.ObjectId;
  pai?: mongoose.Types.ObjectId;
  fazenda: string;
  observacoes?: string;
  dataCadastro: Date;
  ultimaAtualizacao: Date;
  ativo: boolean;
}

// Esquema do animal
const AnimalSchema = new Schema<IAnimal>({
  identificacao: {
    type: String,
    required: [true, 'Por favor, informe a identificação do animal'],
    unique: true,
    trim: true,
    maxlength: [20, 'Identificação não pode ter mais de 20 caracteres']
  },
  tipo: {
    type: String,
    required: [true, 'Por favor, informe o tipo do animal'],
    enum: ['Bezerro', 'Novilho', 'Boi', 'Vaca', 'Touro'],
    trim: true
  },
  raca: {
    type: String,
    required: [true, 'Por favor, informe a raça do animal'],
    trim: true
  },
  dataNascimento: {
    type: Date,
    required: [true, 'Por favor, informe a data de nascimento']
  },
  sexo: {
    type: String,
    required: [true, 'Por favor, informe o sexo do animal'],
    enum: ['Macho', 'Fêmea'],
    trim: true
  },
  peso: {
    type: Number,
    required: [true, 'Por favor, informe o peso do animal em kg']
  },
  altura: {
    type: Number
  },
  status: {
    type: String,
    required: [true, 'Por favor, informe o status do animal'],
    enum: ['Saudável', 'Em tratamento', 'Prenhe', 'Em Quarentena', 'Vendido', 'Abatido'],
    default: 'Saudável'
  },
  mae: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal'
  },
  pai: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal'
  },
  fazenda: {
    type: String,
    required: [true, 'Por favor, informe a fazenda']
  },
  observacoes: {
    type: String,
    maxlength: [1000, 'Observações não podem ter mais de 1000 caracteres']
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  ultimaAtualizacao: {
    type: Date,
    default: Date.now
  },
  ativo: {
    type: Boolean,
    default: true
  }
});

// Middleware para atualizar a data de modificação antes de salvar
AnimalSchema.pre<IAnimal>('save', function(next) {
  this.ultimaAtualizacao = new Date();
  next();
});

// Verifica se o modelo já existe para evitar erro de compilação
const Animal = mongoose.models.Animal || mongoose.model<IAnimal>('Animal', AnimalSchema);

export default Animal; 