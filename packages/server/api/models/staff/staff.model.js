import BaseModel from '../../bin/model';

const definition = {
  queries: {
    contacts: {
      type: ['Contact'],
      args: {
        text: 'String',
      },
    },
  },
  methods: {
    makePreconsultation: {
      description:
        'Make new pre-consultation to new customer receiving from numerous sources',
      args: {
        customer: 'Customer!',
        assignment: 'Assignment!',
        contact: 'Contact!',
        persons: ['Person'],
        preconsultantId: 'String',
        consultantId: 'String',
      },
      return: 'Assignment',
      // roles:['Consultant'],
    },
    createCustomer: {
      description: 'Create new contact for a customer',
      args: {
        contact: 'Contact!',
        position: 'ContactPosition',
      },
      return: 'Contact',
      // roles: ['Consultant'],
    },
    receiveAppointment: {
      description: 'Receive an appointment from inbox',
      args: {
        assignmentId: 'Id!',
      },
      return: 'Assignment',
    },
    transferToConsultant: {
      description: 'Transfer a Contact to other consultant',
      args: {
        customerId: 'Id!',
        toConsultantId: 'Id!',
      },
      return: 'Contact',
      // roles: ['Consultant'],
    },
  },
};

class Model extends BaseModel {
  constructor(app, options) {
    super(app, options, definition);
  }

  findContacts(context) {
    return this.app.models.contact.findContacts(context);
  }

  async makePreconsultation(
    { assignment = {}, contact, persons, preconsultantId, consultantId },
    context,
  ) {
    const { user } = context;
    const newContact = await this.app.entities.contact.create(contact, context);

    persons && persons.forEach(person => {
      person.contactId = newContact._id;
      person.createdAt = new Date();
      person.createdById = user && user._id;
      person.updatedAt = new Date();
      person.updatedById = user && user._id;
    });
    await this.app.models.person.create(persons, context);

    assignment.contactId = newContact._id;
    return this.app.entities.assignment.create(assignment, context);
  }

  receiveAppointment({ appointmentId }, context) {
    return this.app.models.Appointment.get(
      appointmentId,
      context,
    );
  }
}

export default Model;
