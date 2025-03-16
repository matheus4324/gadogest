import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface para o usuário
export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  fazenda: string;
  cargo: string;
  ativo: boolean;
  dataCriacao: Date;
  ultimoAcesso?: Date;
  verificarSenha: (senha: string) => Promise<boolean>;
}

// Esquema do usuário
const UsuarioSchema = new Schema<IUsuario>({
  nome: {
    type: String,
    required: [true, 'Por favor, informe o nome'],
    trim: true,
    maxlength: [50, 'Nome não pode ter mais de 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Por favor, informe o email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, informe um email válido'
    ]
  },
  senha: {
    type: String,
    required: [true, 'Por favor, informe uma senha'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
    select: false
  },
  fazenda: {
    type: String,
    required: [true, 'Por favor, informe o nome da fazenda'],
    trim: true
  },
  cargo: {
    type: String,
    required: true,
    enum: ['Administrador', 'Gerente', 'Funcionário'],
    default: 'Funcionário'
  },
  ativo: {
    type: Boolean,
    default: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  ultimoAcesso: {
    type: Date
  }
});

// Hash da senha antes de salvar
UsuarioSchema.pre<IUsuario>('save', async function(next) {
  if (!this.isModified('senha')) {
    next();
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para verificar senha
UsuarioSchema.methods.verificarSenha = async function(senhaInformada: string): Promise<boolean> {
  return await bcrypt.compare(senhaInformada, this.senha);
};

// Verifica se o modelo já existe para evitar erro de compilação
const Usuario = mongoose.models.Usuario || mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario; 