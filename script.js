//Crear base de datos 
use gestor_tareas

//Insertar un documento 

db.tasks.insertOne({
  title: "Realizar la actividad fase 4: Proyecto de ingenieria",
  description: "Terminar el documento final de la fase 4",
  status: "pendiente",
  priority: "alta",
  due_date: new Date("2025-05-11"),
  tags: ["estudio", "escuela"],
  created_at: new Date()
})

//Insertar 100 documentos de manera aleatoria 

const estados = ["pendiente", "en progreso", "completada"];
const prioridades = ["alta", "media", "baja"];

for (let i = 1; i <= 100; i++) {
  db.tasks.insertOne({
    title: `Tarea #${i}`,
    description: `Descripción de la tarea número ${i}`,
    status: estados[Math.floor(Math.random() * estados.length)],
    priority: prioridades[Math.floor(Math.random() * prioridades.length)],
    due_date: new Date(`2025-05-${(i % 28) + 1}`),
    tags: ["personal", "tarea"],
    created_at: new Date()
  });
}


//Revisar las tareas que se crearon

db.tasks.find().pretty()

//Cambiar el estado de la tarea 10 a completada 

db.tasks.updateOne(
  { title: "Tarea #11" },
  { $set: { status: "completada" } }

//borrar la tarea 56

db.tasks.deleteOne({ title: "Tarea #56" })

//Consultar las tareas con prioridad alta

db.tasks.find({ priority: "alta" }).pretty()

//consultar las tareas en estado pendiente 

db.tasks.find({
  status: "pendiente",
  due_date: { $lt: new Date("2025-05-15") }
}).pretty()

//Consultar las tareas con la etiquta personal

db.tasks.find({ tags: "personal" }).pretty()

//Suma de tareas para cada uno de los estados

db.tasks.aggregate([
  { $group: { _id: "$status", total: { $sum: 1 } } }
])

//promediar los dias que hacen falta para la tarea desde el 6 de mayo

db.tasks.aggregate([
  {
    $project: {
      title: 1,
      dias_restantes: {
        $round: [
          {
            $divide: [
              { $subtract: ["$due_date", new Date("2025-05-06")] },
              1000 * 60 * 60 * 24
            ]
          }, 0
        ]
      }
    }
  }
])



