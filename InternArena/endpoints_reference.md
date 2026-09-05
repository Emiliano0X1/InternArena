# 📖 Catálogo Maestro de Endpoints - LeetArena Backend (Spring Boot)

> **Base URL Local**: `http://localhost:8080`  
> **CORS**: Habilitado globalmente para todos los puertos locales (`localhost:*`, `127.0.0.1:*`)  
> **Formato de Fechas**: ISO-8601 `YYYY-MM-DDTHH:mm:ss` (ejemplo: `2026-08-30T18:00:00`)

---

## 1. ⚔️ Salas y Partidas (`Party`)
Controlador: `PartyController.java` | **Base Path**: `/api/v1/partys`

### 1.1. Obtener todas las salas
- **Método**: `GET`
- **Ruta**: `/api/v1/partys`
- **Parámetros**: *Ninguno*
- **Respuesta `200 OK`**: Lista de objetos `Party`
```json
[
  {
    "party_id": 1,
    "party_status": "WAITING",
    "invitation_code": "482910",
    "partyDifficulty": null,
    "partyPrize": null,
    "endTime": null,
    "players": [ { "player_id": 1, "playerUsername": "neo" } ],
    "user": { "user_id": 1, "userEmail": "admin@test.com" }
  }
]
```

### 1.2. Obtener sala por ID
- **Método**: `GET`
- **Ruta**: `/api/v1/partys/{id}`
- **Parámetros Path**: `id` (Integer)
- **Respuesta `200 OK`**: Objeto `Party`
- **Respuesta `404 Not Found`**: Si no existe la sala.

### 1.3. Crear sala inicial (Lobby en espera)
- **Método**: `POST`
- **Ruta**: `/api/v1/partys/create`
- **Query Params**: `admin_id` (Integer, obligatorio)
- **Ejemplo**: `POST /api/v1/partys/create?admin_id=1`
- **Comportamiento**:
  - Crea la sala con estado `WAITING`.
  - Genera automáticamente un código único de invitación de 6 dígitos (`invitation_code`).
  - Agrega al usuario anfitrión como primer jugador (`Player`).
- **Respuesta `200 OK`**: Objeto `Party` creado.
- **Respuesta `400 Bad Request`**: `{"error": "The admin not exist"}`

### 1.4. Unir nuevo jugador a una sala mediante código de invitación
- **Método**: `POST`
- **Ruta**: `/api/v1/partys/completeParty/newPlayer`
- **Query Params**:
  - `user_id` (Integer)
  - `invitation_code` (String, 6 dígitos)
- **Ejemplo**: `POST /api/v1/partys/completeParty/newPlayer?user_id=2&invitation_code=482910`
- **Comportamiento**:
  - Valida que la sala exista y esté en estado `WAITING`.
  - Valida que la sala no esté llena (máximo 10 jugadores).
  - Valida que el usuario no esté ya dentro de la sala.
  - Agrega al jugador a la lista de participantes.
- **Respuesta `200 OK`**: Objeto `Party` actualizado con el nuevo jugador en `players`.
- **Respuesta `400 Bad Request`**: `{"error": "The party with : 482910 invitation code wasnt found"}` o `{"error": "The party is full"}`.

### 1.5. Iniciar partida y generar problemas (`completeParty`)
- **Método**: `POST`
- **Ruta**: `/api/v1/partys/completeParty`
- **Body JSON** (`PartyDTO`):
```json
{
  "party_id": 1,
  "difficulty": "medium",
  "partyPrize": "100",
  "endTime": "2026-08-30T20:00:00"
}
```
- **Comportamiento**:
  - Requiere un mínimo de 3 jugadores en la sala (`players.size() >= 3`).
  - Genera automáticamente un conjunto de problemas de LeetCode (`LeetcodeSet`) balanceado según la dificultad (`easy`, `medium`, `hard`) y la duración en días.
  - Cambia el estado de la sala a `ACTIVATED`.
- **Respuesta `200 OK`**: Objeto `Party` con su `leetcodeSet` asociado y status `ACTIVATED`.
- **Respuesta `400 Bad Request`**: `{"error": "There are no players enough in this party"}` o `{"error": "This party was already completed or is currently in progress"}`.

### 1.6. Actualizar sala
- **Método**: `PUT`
- **Ruta**: `/api/v1/partys/{id}`
- **Parámetros Path**: `id` (Integer)
- **Body JSON** (`PartyDTO`): `{ "difficulty": "hard", "partyPrize": "200", "endTime": "..." }`
- **Respuesta `200 OK`**: Objeto `Party` actualizado.

### 1.7. Eliminar sala
- **Método**: `DELETE`
- **Ruta**: `/api/v1/partys/{id}`
- **Parámetros Path**: `id` (Integer)
- **Respuesta `204 No Content`**

### 1.8. Salir de una partida en curso (Leave Active Party)
- **Método**: `POST`
- **Ruta**: `/api/v1/partys/{id}/leave`
- **Parámetros**:
  - Path: `id` (Integer, ID de la partida)
  - Query: `user_id` (Integer, ID del usuario que sale)
- **Ruta Alternativa**: `POST /api/v1/partys/leave?party_id={party_id}&user_id={user_id}`
- **Comportamiento**:
  - Si sale el anfitrión (host), la partida se marca como finalizada (`ENDED`).
  - Si sale un jugador regular y quedan $\ge 2$ jugadores, la partida continúa activa (`ACTIVE`).
- **Respuesta `200 OK`**: Objeto `Party` con el estado actualizado.
- **Respuesta `400 Bad Request`**: `{"error": "user_id is required"}`

---

## 2. 👤 Usuarios (`User`)
Controlador: `UserController.java` | **Base Path**: `/api/v1/users`

### 2.1. Listar todos los usuarios
- **Método**: `GET`
- **Ruta**: `/api/v1/users`
- **Respuesta `200 OK`**: `[ { "user_id": 1, "username": "...", "userEmail": "...", "userLeetcoins": 0 } ]`

### 2.2. Obtener usuario por ID
- **Método**: `GET`
- **Ruta**: `/api/v1/users/{id}`
- **Respuesta `200 OK`**: Objeto `User` | **`404 Not Found`**

### 2.3. Registrar nuevo usuario
- **Método**: `POST`
- **Ruta**: `/api/v1/users/create`
- **Body JSON** (`UserDTO`):
```json
{
  "email": "usuario@ejemplo.com"
}
```
- **Respuesta `200 OK`**: Objeto `User` creado con `userLeetcoins: 0`.

### 2.4. Actualizar usuario
- **Método**: `PUT`
- **Ruta**: `/api/v1/users/{id}`
- **Body JSON** (`UserDTO`): `{ "email": "nuevo_correo@ejemplo.com" }`
- **Respuesta `200 OK`**: Objeto `User` actualizado.

### 2.5. Eliminar usuario
- **Método**: `DELETE`
- **Ruta**: `/api/v1/users/{id}`
- **Comportamiento**: Elimina en cascada los registros (`records`), jugadores (`players`) y salas asociadas.
- **Respuesta `200 OK`**: `"User deleted successfully."`

---

## 3. 🎮 Jugadores / Participantes (`Player`)
Controlador: `PlayerController.java` | **Base Path**: `/api/v1/players`

### 3.1. Listar jugadores
- **Método**: `GET`
- **Ruta**: `/api/v1/players`

### 3.2. Obtener jugador por ID
- **Método**: `GET`
- **Ruta**: `/api/v1/players/{id}`

### 3.3. Obtener jugadores por ID de Usuario
- **Método**: `GET`
- **Ruta**: `/api/v1/players/byuser/{userId}`
- **Parámetros Path**: `userId` (Integer)
- **Respuesta `200 OK`**: Lista de perfiles de jugador asociados a esa cuenta.

### 3.4. Crear jugador
- **Método**: `POST`
- **Ruta**: `/api/v1/players/create`
- **Body JSON** (`PlayerDTO`):
```json
{
  "playerUsername": "coderX",
  "userId": 1
}
```
- **Respuesta `200 OK`**: Objeto `Player` (`player_id`, `playerUsername`, `playerEasys`, `playerMediums`, `playerHards`).

### 3.5. Actualizar estadísticas de jugador
- **Método**: `PUT`
- **Ruta**: `/api/v1/players/{id}`
- **Body JSON** (`PlayerDTO`): `{ "playerUsername": "..." }`

### 3.6. Eliminar jugador
- **Método**: `DELETE`
- **Ruta**: `/api/v1/players/{id}`

---

## 4. 🧩 Problemas de LeetCode (`Problem`)
Controlador: `ProblemController.java` | **Base Path**: `/api/v1/problem`

### 4.1. Listar problemas paginados
- **Método**: `GET`
- **Ruta**: `/api/v1/problem`
- **Query Params**:
  - `page` (Integer, default: 0)
  - `size` (Integer, default: 20, max: 100)
  - `sort` (String, default: `problemId`, opciones permitidas: `problemId`, `random_id`)
- **Ejemplo**: `GET /api/v1/problem?page=0&size=10&sort=problemId`
- **Respuesta `200 OK`**: Objeto `Page<Problem>` de Spring Data con `content`, `totalPages`, `totalElements`, `size`, `number`.

### 4.2. Agregar nuevo problema
- **Método**: `POST`
- **Ruta**: `/api/v1/problem/add`
- **Body JSON** (`ProblemDTO`):
```json
{
  "title": "Two Sum",
  "difficulty": "easy",
  "url": "https://leetcode.com/problems/two-sum/",
  "paidOnly": false
}
```
- **Respuesta `200 OK`**: Objeto `Problem` con `problemId`, `random_id`.

### 4.3. Actualizar problema
- **Método**: `PUT`
- **Ruta**: `/api/v1/problem/update/{id}`
- **Parámetros Path**: `id` (Integer)
- **Body JSON** (`ProblemDTO`): `{ "title": "...", "difficulty": "...", "url": "..." }`

### 4.4. Eliminar problema
- **Método**: `DELETE`
- **Ruta**: `/api/v1/problem/delete/{id}`

---

## 5. 📚 Sets de Problemas (`LeetcodeSet`)
Controlador: `LeetcodeSetController.java` | **Base Path**: `/api/v1/leetcode_set`

### 5.1. Listar todos los sets
- **Método**: `GET`
- **Ruta**: `/api/v1/leetcode_set`

### 5.2. Obtener set por ID (con sus problemas asignados)
- **Método**: `GET`
- **Ruta**: `/api/v1/leetcode_set/{leetcode_set_id}`
- **Respuesta `200 OK`**: Objeto `LeetcodeSet` con array `problemsList`.

### 5.3. Generar set automáticamente
- **Método**: `POST`
- **Ruta**: `/api/v1/leetcode_set/create`
- **Body JSON** (`CreateLeetcodeSetDTO`):
```json
{
  "difficulty": "medium",
  "endTime": "2026-08-30T18:00:00"
}
```
- **Respuesta `200 OK`**: Objeto `LeetcodeSet` creado con los problemas seleccionados algorítmicamente.

### 5.4. Actualizar lista de problemas de un set
- **Método**: `PUT`
- **Ruta**: `/api/v1/leetcode_set/{id}?id={id}`
- **Body JSON** (`LeetcodeSetDTO`): `{ "problems": [ { "problemId": 1 }, { "problemId": 5 } ] }`

### 5.5. Eliminar set
- **Método**: `DELETE`
- **Ruta**: `/api/v1/leetcode_set/delete/{leetcode_set_id}`

---

## 6. 🏆 Historial y Clasificaciones (`Record`)
Controlador: `RecordController.java` | **Base Path**: `/api/v1/record`

### 6.1. Listar todos los records
- **Método**: `GET`
- **Ruta**: `/api/v1/record`

### 6.2. Obtener record por ID
- **Método**: `GET`
- **Ruta**: `/api/v1/record/{id}`

### 6.3. Obtener records por Usuario
- **Método**: `GET`
- **Ruta**: `/api/v1/record/byuser/{id}`
- **Parámetros Path**: `id` (User ID)
- **Respuesta `200 OK`**: Lista de partidas jugadas y posiciones del usuario.

### 6.4. Crear nuevo record
- **Método**: `POST`
- **Ruta**: `/api/v1/record/create`
- **Body JSON** (`RecordDTO`):
```json
{
  "ranking": "1",
  "endTime": "2026-08-30T21:00:00",
  "userId": 1
}
```

### 6.5. Actualizar record
- **Método**: `PUT`
- **Ruta**: `/api/v1/record/update/{id}`

### 6.6. Eliminar record
- **Método**: `DELETE`
- **Ruta**: `/api/v1/record/delete/{id}`

---

## 7. 📝 Resúmenes de Sala (`Summary`)
Controlador: `SummaryController.java` | **Base Path**: `/api/v1/summary`

### 7.1. Listar resúmenes
- **Método**: `GET`
- **Ruta**: `/api/v1/summary`

### 7.2. Obtener resumen por ID
- **Método**: `GET`
- **Ruta**: `/api/v1/summary/{sumamry_id}`

### 7.3. Crear resumen
- **Método**: `POST`
- **Ruta**: `/api/v1/summary/create`
- **Body JSON** (`SummaryDTO`): `{ "summaryDescription": "Victoria de jugador 1 en 45 mins" }`

### 7.4. Editar descripción del resumen
- **Método**: `PATCH`
- **Ruta**: `/api/v1/summary/edit_des/{id}`
- **Body JSON** (`SummaryDTO`): `{ "summaryDescription": "Nueva descripción" }`

### 7.5. Eliminar resumen
- **Método**: `DELETE`
- **Ruta**: `/api/v1/summary/delete/{summary_id}`

---

## 8. 🛍️ Tienda y Productos (`Product`)
Controlador: `ProductController.java` | **Base Path**: `/products`

### 8.1. Listar catálogo de la tienda
- **Método**: `GET`
- **Ruta**: `/products`
- **Respuesta `200 OK`**:
```json
[
  {
    "product_id": 1,
    "productName": "Avatar Dragón Neón",
    "productPrice": 150,
    "productTag": "avatar",
    "productDescription": "Icono animado para perfil",
    "productImg": "https://..."
  }
]
```

### 8.2. Obtener producto por ID
- **Método**: `GET`
- **Ruta**: `/products/{id}`

### 8.3. Crear producto en tienda
- **Método**: `POST`
- **Ruta**: `/products/create`
- **Body JSON** (`ProductDTO`):
```json
{
  "productName": "Banner Cyberpunk",
  "productPrice": 80,
  "productTag": "banner",
  "productDescription": "Banner exclusivo para el perfil",
  "productImg": "https://..."
}
```

### 8.4. Actualizar producto
- **Método**: `PUT`
- **Ruta**: `/products/{id}`

### 8.5. Eliminar producto
- **Método**: `DELETE`
- **Ruta**: `/products/{id}`
