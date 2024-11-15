export default {
  commands: {
    permitDescription: "Permite que un usuario ingrese a un canal de voz privado",
    permitUser: "usuario", // No uses mayúsculas
    permitUserDescription: "El usuario que recibe el permiso",
    adminPermitDescription: "Permite que un usuario ingrese a un canal de voz privado",
    adminPermitUser: "usuario", // No uses mayúsculas
    adminPermitUserDescription: "El usuario que recibe el permiso",
    adminPermitChannelName: "nombre_canal", // No uses mayúsculas
    adminPermitChannelNameDescription: "El nombre del canal al que deseas otorgar acceso",
    renameDescription: "Cambia el nombre de tu propio canal de voz",
    newName: "nuevo_nombre", // No uses mayúsculas
    newNameDescription: "El nuevo nombre para tu canal de voz",
    publicDescription: "Haz tu llamada pública para todos",
    privateDescription: "Haz tu llamada privada para todos",
    limitDescription: "Establece un límite de usuarios para tu canal de voz",
    limit: "límite",
    limitOptionDescription: "El número máximo de usuarios permitidos en el canal de voz (0 para sin límite)",
    unlimitDescription: "Elimina el límite de usuarios de tu llamada",
    transferDescription: "Transfiere la propiedad de tu llamada de voz",
    TransferName: "nuevo_propietario",
    TransferNameDescription: "Usuario que se convierte en el nuevo propietario",
    claimDescription: "Reclama la propiedad del canal de voz",
    rejectDescription: "Rechaza a un usuario permitido",
    rejectNameDescription: "El usuario que será rechazado",
    disconnectDescription: "Desconecta a un usuario",
    disconnectUserDescription: "El usuario que será desconectado",
    addCoOwnerDescription: "Agrega un co-propietario al canal de voz",
    removeCoOwnerDescription: "Elimina un co-propietario del canal de voz",
    addCoOwnerNameDescription: "El usuario que será agregado como co-propietario",
    removeCoOwnerNameDescription: "El usuario que será eliminado como co-propietario",
    unghostDescription: "Restaura el acceso a un usuario ghost en el canal de voz",
    unghostUser: "usuario",
    unghostUserDescription: "El usuario que será des-ghosted",
    ghostDescription: "Hace invisible a un usuario para los demás en el canal de voz",
    ghostUser: "usuario",
    ghostUserDescription: "El usuario que será ghosted",
    ghostAllDescription: "Este comando permite hacer 'ghost' a todos los usuarios en tu canal de voz reclamado.",
    unGhostAllDescription: "Este comando permite hacer 'unghost' a todos los usuarios en tu canal de voz reclamado.",
  },
  debugger: {
    // Tal vez lo agregaré más tarde, ¡no te preocupes por ahora! :D
  },
  messages: {
    voiceClaim: {
      joinVoice: "Debes estar en un canal de voz para reclamar la propiedad.",
      voiceChannel: "Solo puedes reclamar la propiedad de un canal de voz, no de un StageChannel.",
      notClaimed: "Este canal de voz aún no ha sido reclamado.",
      ownerInVoice: "El propietario aún está en el canal de voz. No puedes reclamar la propiedad aún.",
      claimedOwner: "Has reclamado exitosamente la propiedad del canal de voz.",
      youTheOwner: "Ahora eres el propietario del canal de voz.",
      errorClaim: "Ocurrió un error al intentar reclamar la propiedad. Intenta nuevamente más tarde."
    },
    voiceDisconnect: {
        mustBeVoice: "Debes estar en un canal de voz para desconectar a alguien.",
        noPermission: "No tienes permiso para desconectar usuarios en este canal.",
        userNeeded: "Debes especificar un usuario para desconectar.",
        sameVoice: "El usuario especificado no está en el mismo canal de voz.",
        disconnectSuccess: "Has desconectado exitosamente a %s del canal de voz '%s'.",
        youHaveBeenDisconnected: "Has sido desconectado del canal de voz '%s'.",
        disconnectError: "Ocurrió un error al intentar desconectar al usuario. Intenta nuevamente más tarde.",
        notClaimed: "Este canal de voz aún no ha sido reclamado.",
        ownerNoPermission: "No puedes desconectar a alguien con permisos de administrador.",
    },
    voiceLimit: {
      validLimit: "Especifica un límite de usuarios válido entre 0 (sin límite) y 99.",
      inVoice: "Debes estar en un canal de voz para establecer un límite de usuarios.",
      noPerms: "No tienes permiso para establecer un límite de usuarios en este canal.",
      limitChange: "El límite de usuarios para '%s' ha sido establecido a: %s",
      noLimit: "sin límite",
      tryAgain: "Ocurrió un error al intentar establecer el límite de usuarios. Intenta nuevamente más tarde.",
      notClaimed: "Este canal de voz aún no ha sido reclamado.",
    },
    voiceAddOwner: {
      mustBeVoice: "Debes estar en un canal de voz para agregar un co-propietario.",
      noPermission: "No tienes permiso para agregar un co-propietario a este canal.",
      needUser: "Debes especificar un usuario para agregar como co-propietario.",
      alreadyOwner: "%s ya es co-propietario de este canal.",
      succesfullAdded: "%s ha sido agregado exitosamente como co-propietario del canal %s"
    },
    voicePermit: {
      provide: "Debes especificar un usuario al que otorgar el permiso.",
      mustInVoice: "Debes estar en un canal de voz para otorgar permisos a otros.",
      noCreator: "Este canal no tiene un creador o no está registrado.",
      permission: "Debes ser el creador del canal, un co-propietario o tener permisos de 'ADMINISTRADOR' para otorgar permisos a otros.",
      error: "Ocurrió un error al intentar otorgar permisos al usuario.",
      succesfullPermit: "El usuario <@%s> ha recibido el permiso para ingresar al canal de voz %s."
    },
    voicePermitAdmin: {
      provide: "Debes especificar un usuario y el nombre del canal para otorgar permisos.",
      noChannel: "No se encontró un canal con el nombre '%s'.",
      specifiedChannel: "El canal especificado no es un canal de voz.",
      noPermission: "Debes ser el creador del canal o tener permisos de 'ADMINISTRADOR' para otorgar permisos.",
      succesfull: "El usuario <@%s> ha recibido el permiso para ingresar al canal de voz '%s'.",
      error: "Ocurrió un error al intentar otorgar permisos al usuario.",
    },
    voicePrivate: {
      mustBeInVoice: "Debes estar en un canal de voz para hacerlo privado.",
      noCreator: "Este canal no tiene un creador o no está registrado.",
      noPermission: "Debes ser el creador del canal, un co-propietario o tener permisos de 'ADMINISTRADOR' para hacerlo privado.",
      succesfull: "El canal de voz '%s' ahora es privado y solo accesible para usuarios permitidos.",
      error: "Ocurrió un error al intentar hacerlo privado. Intenta nuevamente más tarde.",
    },
    voicePublic: {
      mustBeInVoice: "Debes estar en un canal de voz para hacerlo público.",
      noCreator: "Este canal no tiene un creador o no está registrado.",
      noPermission: "Debes ser el creador del canal, un co-propietario o tener permisos de 'ADMINISTRADOR' para hacerlo público.",
      succesfull: "El canal de voz '%s' ahora es accesible para todos.",
      error: "Ocurrió un error al intentar hacerlo público. Intenta nuevamente más tarde.",
    },
    voiceReject: {
      MustBeInVoice: "Debes estar en un canal de voz para hacerlo privado.",
      noCreator: "Este canal no tiene un creador o no está registrado.",
      mustSpecify: "Debes especificar un usuario para rechazar.",
      notInSameVoice: "El usuario especificado no está en el mismo canal de voz.",
      noOwnerReject: "No puedes rechazar al propietario o a un usuario con permisos de ADMINISTRADOR.",
      noAdminReject: "No puedes rechazar a un usuario con permisos de ADMINISTRADOR.",
      noPermissions: "Debes ser el creador del canal, un co-propietario o tener permisos de 'ADMINISTRADOR' para rechazar usuarios.",
      succesfull: "Has rechazado exitosamente a %s del canal %s.",
      rejectedByOwner: "Has sido rechazado para unirte al canal de voz %s.",
      error: "Ocurrió un error al intentar rechazar al usuario. Intenta nuevamente más tarde.",
      userIsGhosted: "Este usuario está 'ghosted' y no puede ser rechazado.",
    },
    voiceRemoveOwner: {
      mustSpecify: "Debes especificar un usuario para eliminar como propietario.",
      mustBeInCall: "Debes estar en un canal de voz para eliminar un propietario.",
      noPermissions: "No tienes permiso para eliminar a un propietario de este canal.",
      noCoOwner: "%s no es co-propietario de este canal.",
      succesfull: "El usuario %s ha sido eliminado como co-propietario del canal de voz %s.",
      removedByOwner: "Has sido eliminado como co-propietario del canal de voz '%s'.",
      error: "Ocurrió un error al intentar eliminar al co-propietario. Intenta nuevamente más tarde.",
    },
    voiceRename: {
      newName: "Especifica un nuevo nombre para el canal de voz.",
      mustBeInVoice: "Debes estar en un canal de voz para renombrarlo.",
      noCreator: "Este canal no tiene un creador o no está registrado.",
      noPermissions: "Debes ser el creador del canal, un co-propietario o tener permisos de 'ADMINISTRADOR' para renombrar el canal.",
      succesfull: "El canal ha sido renombrado a %s.",
      error: "Ocurrió un error al intentar renombrar el canal. Intenta nuevamente más tarde.",
    },
    voiceTransfer: {
      provide: "Debes especificar un usuario al que transferir la propiedad.",
      mustBeInVoice: "Debes estar en un canal de voz para transferir la propiedad.",
      noCreator: "Este canal no tiene un creador o no está registrado.",
      noPermissions: "Debes ser el creador del canal, un co-propietario o tener permisos de 'ADMINISTRADOR' para transferir la propiedad.",
      notInVoice: "El usuario al que deseas transferir la propiedad no está en el mismo canal de voz.",
      succesfull: "La propiedad del canal de voz '%s' ha sido transferida a <@%s>.",
      newOwner: "Ahora eres el propietario del canal de voz '%s'.",
      error: "Ocurrió un error al intentar transferir la propiedad. Intenta nuevamente más tarde.",
    },
    voiceUnlimit: {
      mustBeInVoice: "Debes estar en un canal de voz para eliminar el límite de usuarios.",
      noCreator: "Este canal no tiene un creador o no está registrado.",
      noPermissions: "Debes ser el creador del canal, un co-propietario o tener permisos de 'ADMINISTRADOR' para eliminar el límite de usuarios.",
      succesfull: "El límite de usuarios de '%s' ha sido eliminado, lo que lo hace ilimitado.",
      error: "Ocurrió un error al intentar eliminar el límite de usuarios. Intenta nuevamente más tarde.",
    },
    voiceGhost: {
      provideUser: "Especifica un usuario para hacer 'ghost'.",
      mustBeInVoice: "Debes estar en un canal de voz para usar este comando.",
      noClaimedChannel: "El canal de voz en el que estás no ha sido reclamado.",
      noPermissions: "No tienes permisos para hacer 'ghost' a este usuario. Debes ser el propietario, co-propietario o tener permisos de administrador.",
      success: "%s ha sido 'ghosted' en el canal de voz: %s. El canal ahora está oculto para todos.",
      hiddenFromOthers: "Ahora eres 'ghosted' en el canal de voz %s. El canal ahora está oculto para los demás.",
      error: "Ocurrió un error al intentar eliminar el límite de usuarios. Intenta nuevamente más tarde.",
    },
    voiceUnghost: {
      provideUser: "Especifica un usuario para hacer 'unghost'.",
      mustBeInVoice: "Debes estar en un canal de voz para usar este comando.",
      noClaimedChannel: "El canal de voz en el que estás no ha sido reclamado.",
      noPermissions: "No tienes permisos para hacer 'unghost' a este usuario. Debes ser el propietario, co-propietario o tener permisos de administrador.",
      notGhosted: "Este usuario no está actualmente 'ghosted' en el canal.",
      success: "%s ha sido 'unghosted' en el canal de voz: %s. El canal ahora es visible para todos.",
      restoredAccess: "Tu acceso al canal de voz %s ha sido restaurado. El canal ahora es visible para todos.",
      error: "Ocurrió un error al intentar eliminar el límite de usuarios. Intenta nuevamente más tarde.",
    },
    voiceGhostAll: {
      mustBeInVoice: "Debes estar en un canal de voz para hacer 'ghost' a todos.",
      noClaimedChannel: "Este canal de voz aún no ha sido reclamado por ningún usuario.",
      noPermissions: "No tienes permisos para hacer 'ghost' a todos en este canal de voz.",
      success: "El canal **%s** ha sido ocultado correctamente para todos, ¡excepto los propietarios/co-propietarios!",
      hiddenFromOthers: "El canal de voz **%s** ahora está oculto para todos, excepto los propietarios/co-propietarios.",
    },
    voiceUnGhostAll: {
      mustBeInVoice: "Debes estar en un canal de voz para hacer 'unghost' a todos los usuarios.",
      noClaimedChannel: "Este canal de voz no ha sido reclamado por ti o no es un canal de voz válido.",
      noPermissions: "No tienes permisos para hacer 'unghost' a los usuarios en este canal de voz.",
      success: "Todos los usuarios han sido 'unghosted' en el canal de voz: %s.",
      accessRestored: "Tu acceso al canal de voz %s ha sido restaurado.",
    },
  },
};
