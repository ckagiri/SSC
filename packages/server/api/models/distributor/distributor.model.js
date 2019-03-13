import BaseModel from '../../bin/model';

class Model extends BaseModel {
  updateUplinetree(context) {
    const model = this.app.models.Contact;

    async function updateDownLine(consultant) {
      const sponsor = await model.Model.findOne({
        codeRef: consultant.codeRef,
      });
      const children = await model.find({
        query: {
          consulRef: consultant.codeRef,
          codeRef: { $nin: ['ES', 'HCM', 'HN', '0400154'] },
        },
      });

      if (_.size(children) < 1) {
        return children;
      }

      return Promise.all(
        _.map(children, async contact => {
          await model.Model.updateOne(
            { codeRef: contact.codeRef },
            {
              $set: {
                uplinetree: [sponsor.uplinetree, contact._id.toString()].join(
                  '/'
                ),
              },
            }
          );
          await updateDownLine(contact);
          return contact;
        })
      );
    }

    async function updateTreeFn() {
      const contacts = await model.find(context);

      await model.Model.updateMany(
        { seq: { $gte: 1 } },
        { $set: { uplinetree: '' } }
      );

      const rootContact = await model.Model.findOne({ codeRef: '0400154' });
      await model.Model.updateOne(
        { codeRef: '0400154' },
        { $set: { uplinetree: '/' + rootContact._id.toString() } }
      );

      await updateDownLine(rootContact);

      return contacts;
    }
    return updateTreeFn();
  }
}

export default Model;
