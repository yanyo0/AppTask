const $ = (elem) => document.querySelector(elem)
const $$ = (elem) => document.querySelectorAll(elem)



let tareas = [
    {
        id: 1,
        titulo: "Estudiar html",
        estado: "Terminado",
        date: [6, 4, 1, 2023],
    },

    {
        id: 2,
        titulo: "Estudiar css",
        estado: "En progreso",
        date: [6, 4, 1, 2023],
    },
    {
        id: 3,
        titulo: "Estudiar js",
        estado: "Pendiente",
        date: [6, 4, 1, 2023],
    },
    {
        id: 4,
        titulo: "Practicar js",
        estado: "En progreso",
        date: [6, 4, 1, 2023],
    },
]

const days = ["Dom.", "Lun.", "Mar.", "Mier.", "Jue.", "Vie.", "Sab."]
const month = ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."]


window.addEventListener('load', () => {

    //  VARIABLES ------------------------------------------------------------


    const $body = $("body")
    const $h1 = $("h1")
    const $main = $("main")
    const $containerBoxIcon = $("#containerBoxIcon")
    const $boxIcon = $("#boxIcon")
    const $containerCard = $("#containerCard")
    const $containerTaskToDo = $("#containerTaskToDo")
    const $containerTaskInProgress = $("#containerTaskInProgress")
    const $containerTaskComplete = $("#containerTaskComplete")
    const $taskToDo = $("#taskToDo")
    const $taskInProgress = $("#taskInProgress")
    const $taskComplete = $("#taskComplete")
    const $appHeader = $("#appHeader")
    const $dateHeader = $("#dateHeader")
    const $search = $("#search")
    const $containerModalSearch = $(".containerModalSearch")
    const $closeModalSearch = $("#closeModalSearch")
    const $btnSearch = $("#btnSearch")
    const $wordSearch = $("#wordSearch")
    const $$containerTask = Array.from($$(".containerTask"))
    const $containerModalAddTask = $(".containerModalAddTask")
    const $refresh = $("#refresh")
    const $add = $("#add")
    const $btnLigth = $("#btnLigth")
    const $closeModalAdd = $("#closeModalAdd")
    const $addTitleTask = $("#addTitleTask")
    const $errorTitleTask = $("#errorTitleTask")
    const $selectStatus = $("#selectStatus")
    const $errorStatus = $("#errorStatus")
    const $btnAdd = $("#btnAdd")
    const $formAdd = $("#formAdd")
    const $formSearch = $("#formSearch")
    const $errorTitleEdit = $("#errorTitleEdit")
    const $closeModalEdit = $("#closeModalEdit")
    const $containerModalEditTask = $(".containerModalEditTask")
    const $editTitleTask = $("#editTitleTask")
    const $editStatus = $("#editStatus")
    const fecha = new Date();
    const diaSemana = fecha.getDay();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const ano = fecha.getFullYear();
    const regExpAlpha = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{5,20}$/



    let valueSearch, searchToDo, searchInProgress, searchComplete, valueAdd, valueSelectStatus, select, valueEdit


    

    // FUNCIONES ---------------------------------------------------------------------------
    
    // ------------- VALUE ------- ----------------
    const value = () => {
        valueSearch = $wordSearch.value
        valueAdd = $addTitleTask.value
        valueSelectStatus = $selectStatus.value
        valueEdit = $editTitleTask.value
    }
    
    
    const date = (day) => {
        return `${days[day[0]]} ${day[1]},  ${month[day[2]]} ${day[3]}`
    }
    const filterTask = (estatus, array) => {
        return array.filter(tarea => tarea.estado.toLowerCase() === estatus.toLowerCase())
    }

    const createCard = (accessStatus, arrayStatus) => {
      arrayStatus.forEach(tarea => {
      accessStatus.innerHTML += `
       <div class="containerTask moodLigth">
       <div class="taskHeader">
           <div class="dateTask">
               <p>${date(tarea.date)}</p>
           </div>
           <div class="iconTask" id=${tarea.id}>
               <i class="fa-solid fa-pen"></i>
               <i class="fa-solid fa-trash"></i>
               <i class="fa-solid fa-check" ></i>
           </div>
       </div>
       <div class="task">
           <p>${tarea.titulo}</p>
       </div>
       </div>
    `
        })
    }
    const createCardComplete = (accessStatus, arrayStatus) => {
        arrayStatus.forEach(tarea => {
        accessStatus.innerHTML += `
       <div class="containerTask moodLigth">
       <div class="taskHeader">
           <div class="dateTask">
               <p>${date(tarea.date)}</p>
           </div>
           <div class="iconTask" id=${tarea.id}>
               <i class="fa-solid fa-pen"></i>
               <i class="fa-solid fa-trash"></i>
               <i class="fa-solid fa-circle"></i>
           </div>
       </div>
       <div class="task">
           <p>${tarea.titulo}</p>
       </div>
       </div>
    `
        })
    }

    const paint = () => {
        const allTaskToDo = filterTask("pendiente", tareas)
        const allTaskInProgress = filterTask("en progreso", tareas)
        const allTaskComplete = filterTask("terminado", tareas)

        $containerTaskToDo.innerHTML = ""
        $containerTaskInProgress.innerHTML = ""
        $containerTaskComplete.innerHTML = ""

        createCard($containerTaskToDo, allTaskToDo)
        createCard($containerTaskInProgress, allTaskInProgress)
        createCardComplete($containerTaskComplete, allTaskComplete)

        const $$delete = $$(".fa-trash")
        $$delete.forEach(icon => icon.addEventListener("click", (e) => {
            tareas = tareas.filter(tarea => tarea.id !== Number(icon.parentNode.id))
            paint()
        }))

        const $$edit = $$(".fa-pen")
        $$edit.forEach(icon => icon.addEventListener("click", (e) => {
            $containerModalEditTask.classList.remove("displayNone");
            select = tareas.filter(tarea => tarea.id === Number(icon.parentNode.id))
            $editTitleTask.value = select[0].titulo
            if (select[0].estado === "Pendiente") {
                $editStatus.value = "toDo"
            } else if (select[0].estado === "En progreso") {
                $editStatus.value = "inProgress"
            } else {
                $editStatus.value = "complete"
            }
        }))

        const $$check = $$(".fa-check")
        $$check.forEach(icon => icon.addEventListener("click", (e) => {
            console.log("hosd")
            select = tareas.filter(tarea => tarea.id === Number(icon.parentNode.id))
            for (const tarea of tareas) {
                if (tarea.id === Number(icon.parentNode.id)) {
                    if (select[0].estado === "Pendiente") {
                        tarea.estado = "En progreso"
                    } else if (select[0].estado === "En progreso") {
                        tarea.estado = "Terminado"
                    }
                }
            }
            paint()
        }))
    }


    const searchTask = (word) => {
        return tareas.filter(tarea => tarea.titulo.toLowerCase().includes(word.toLowerCase()))
    }

    const paintSearch = (word) => {
        searchToDo = filterTask("pendiente", searchTask(word));
        searchInProgress = filterTask("en progreso", searchTask(word));
        searchComplete = filterTask("terminado", searchTask(word));
        $containerTaskToDo.innerHTML = "";
        $containerTaskInProgress.innerHTML = "";
        $containerTaskComplete.innerHTML = "";
        createCard($containerTaskToDo, searchToDo);
        createCard($containerTaskInProgress, searchInProgress);
        createCardComplete($containerTaskComplete, searchComplete);
    }

    //  ----   Add Task -----

    const compareTask = (value) => {
        return tareas.filter(tarea => tarea.titulo.toLowerCase() === value.toLowerCase());
    }


    let errorsTitle = false

    const valueNewTask = () => {

        if (!(compareTask(valueAdd).length === 0)) {
            $errorTitleTask.innerText = "* La tarea ya existe";
            errorsTitle = true
        } else if (!valueAdd.trim()) {
            $errorTitleTask.innerText = "* Agregue una tarea";
            errorsTitle = true
        } else if (!regExpAlpha.test(valueAdd)) {
            $errorTitleTask.innerText = "* El título debe contener mas de 5 caracteres";
            errorsTitle = true
        } else {
            $errorTitleTask.innerText = ""
            errorsTitle = false
        }
    }
    const valueEditTask = () => {

        if (!valueEdit.trim()) {
            $errorTitleEdit.innerText = "* Debe modificar el título";
            errorsTitle = true
        } else if (!regExpAlpha.test(valueEdit)) {
            $errorTitleEdit.innerText = "* El título debe contener mas de 5 caracteres";
            errorsTitle = true
        } else {
            $errorTitleEdit.innerText = ""
            errorsTitle = false
        }
    }


    let errorsStatus = false
    const valueEstatus = () => {
        if (valueSelectStatus === "") {
            $errorStatus.innerText = "* Debe seleccionar un estado"
            errorsStatus = true
        } else {
            $errorStatus.innerText = ""
            errorsStatus = false
        }
    }

    const addTask = () => {
        if (valueSelectStatus === "toDo") {
            tareas.push({ id: tareas[tareas.length - 1].id + 1, titulo: valueAdd, estado: "Pendiente", date: [diaSemana, dia, mes, ano] });
        }
        if (valueSelectStatus === "inProgress") {
            tareas.push({ id: tareas[tareas.length - 1].id + 1, titulo: valueAdd, estado: "En progreso", date: [diaSemana, dia, mes, ano] });
        }
        if (valueSelectStatus === "complete") {
            tareas.push({ id: tareas[tareas.length - 1].id + 1, titulo: valueAdd, estado: "Terminado", date: [diaSemana, dia, mes, ano] });
        }
    }

    const toggleF = (nodos, clase) => {
        nodos.forEach(nodo => nodo.classList.toggle(clase))
    }



    //EVENTOS  ------------------------------------------------------

    paint();

    $search.addEventListener("click", (e) => {
        $containerModalSearch.classList.remove("displayNone");
    })

    $closeModalSearch.addEventListener("click", (e) => {
        $containerModalSearch.classList.add("displayNone");
    })

    $btnSearch.addEventListener("click", (e) => {
        value();
        paintSearch(valueSearch);
        $wordSearch.value = "";
        $containerModalSearch.classList.add("displayNone");
    })

    $refresh.addEventListener("click", (e) => {
        paint();
    })

    $add.addEventListener("click", (e) => {
        $containerModalAddTask.classList.remove("displayNone");
        $addTitleTask.value = "";
        $selectStatus.value = "";
        
    })


    $closeModalAdd.addEventListener("click", (e) => {
        $containerModalAddTask.classList.add("displayNone");
    })

    $addTitleTask.addEventListener("blur", (e) => {
        value();
        valueNewTask();
    })

    $selectStatus.addEventListener("change", (e) => {
        value();
        valueEstatus();
    })

    $btnAdd.addEventListener("click", (e) => {
        e.preventDefault();
        value();
        valueNewTask();
        valueEstatus();
        if (!errorsTitle && !errorsStatus) {
            addTask();
            paint();
            $addTitleTask.value = ""
            $selectStatus.value = ""
            $containerModalAddTask.classList.add("displayNone");
        }
    })


    const $btnEdit = $("#btnEdit")
    $btnEdit.addEventListener("click", (e) => {
        e.preventDefault();
        value();
        valueEditTask()
        if (!errorsTitle) {
            for (const tarea of tareas) {
                if (tarea.id === select[0].id) {
                    tarea.titulo = valueEdit;
                    console.log(valueEdit)
                    if (valueEdit === "toDo") {
                        tarea.estado = "Pendiente";
                    } else if (valueEdit === "inProgress") {
                        tarea.estado = "En progreso"
                    } else {
                        tarea.estado = "Terminado"
                    }
                }
            }
          paint()
          $containerModalEditTask.classList.add("displayNone");
        }
        
    })

    $editTitleTask.addEventListener("change", (e) => {
        value();
        valueEditTask();
    })

    $closeModalEdit.addEventListener("click", (e) => {
        $containerModalEditTask.classList.add("displayNone");
    })


    // ----       MOOD LIGHT    ----
    $btnLigth.addEventListener("click", (e) => {
        const $$h2 = $$("h2")
        const $modalSearch = $("#modalSearch")
        const $$containerTask = $$(".containerTask")
        const $modalAddTask = $("#modalAddTask")
        const $formAdd = $("#formAdd")
        const $boxAddTitle = $("#boxAddTitle")
        // const $errorTitleTask = $("#errorTitleTask")
        const $$label = $$("label")
        const $modalEditTask = $("#modalEditTask")
        const $formEdit = $("#formEdit")
        const $boxEditTitle = $("#boxEditTitle")
        // const $errorTitleEdit = $("#errorTitleEdit")
    
        $body.classList.toggle("ligth");
        $appHeader.classList.toggle("moodLigth");
        $h1.classList.toggle("moodLigth");
        $main.classList.toggle("moodLigth");
        $containerBoxIcon.classList.toggle("moodLigth");
        toggleF($$h2, "ligth");
        $btnLigth.classList.toggle("colorYellow");
        $boxIcon.classList.toggle("moodLigth");
        $containerCard.classList.toggle("moodLigth");
        toggleF($$containerTask, "moodLigth");
        $taskToDo.classList.toggle("ligth");
        $taskInProgress.classList.toggle("ligth");
        $taskComplete.classList.toggle("ligth");
        $modalSearch.classList.toggle("modalLight");
        $closeModalSearch.classList.toggle("whiteBg");
        $formSearch.classList.toggle("moodLigth");
        toggleF($$label, "moodLigth");
        $btnSearch.classList.toggle("whiteBg");
        $modalAddTask.classList.toggle("modalLight");
        $closeModalAdd.classList.toggle("whiteBg");
        $formAdd.classList.toggle("moodLigth");
        $boxAddTitle.classList.toggle("moodLigth");
        $errorTitleTask.classList.toggle("errosLight");
        $errorStatus.classList.toggle("errosLight");
        $modalEditTask.classList.toggle("modalLight");
        $formEdit.classList.toggle("moodLigth");
        $boxEditTitle.classList.toggle("moodLigth");
        $errorTitleEdit.classList.toggle("errosLight");
    })


})
