import User from "../models/User.model.js"


//GET /users/employees
export const listAllEmployees = async (req, res)  => {
  try {
    const listEmployees = await User.findAll({ 
      where: {role: 'EMPLOYEE'},
      attributes: ['id', 'name', 'isActive'],
      order:[['name', 'ASC']]
    })
    
     
    return res.json(listEmployees)
  } catch (error) {
    return res.status(401).json({error: 'Erro ao listar funcionarios'})
  }
}

// PUT /users/:id/activate
export const activateEmployee = async(req, res) => {
  try {
    const { id } = req.params;
   
    const employee = await User.findOne({
      where: { 
        id, 
        role: 'EMPLOYEE' 
      }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }
    
    if (employee.isActive) {
      return res.status(400).json({ message: 'Este funcionário já está ativo.' });
    }
    
    employee.isActive = true;
    await employee.save();

    return res.status(200).json({
      message: `Funcionário ${employee.name} ativado com sucesso!`,
      user: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        isActive: employee.isActive,
      },
    });
  } catch (error) {
    console.error('Erro ao ativar funcionário:', error);
    return res.status(500).json({ error: 'Erro interno ao ativar funcionário.' });
  }
};

// PATCH /users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      message: `Perfil de ${user.name} alterado para ${role}.`,
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar perfil do usuário.' });
  }
};