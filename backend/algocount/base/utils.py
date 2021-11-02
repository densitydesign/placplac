import base64
import mimetypes


def file_to_base64(path):
    try:
        mime, _ = mimetypes.guess_type(path)

        with open(path, "rb") as f:

            data = base64.b64encode(f.read()).decode()

            return u'data:%s;base64,%s' % (mime, data)
    except Exception:
        raise IOError("Error encoding file")