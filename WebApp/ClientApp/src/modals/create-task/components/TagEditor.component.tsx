import { FunctionComponent } from "react";
import { useState, useCallback, useMemo } from "react";
import type { ChangeEvent } from "react";
import { classNames } from "src/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TagList, Tag as TagItem } from "src/components";
import { Tag } from "src/model";
import { without } from "lodash";

export const useTagInput = (initial: Tag[] = []) => {
  const [tagList, setTagList] = useState<Tag[]>(initial);
  const [currentStringValue, setCurrentStringValue] = useState<string>("");
  const [isPristine, setPristine] = useState<boolean>(true);

  const clear = useCallback(() => {
    setCurrentStringValue("");
    setPristine(true);
    setTagList([]);
  }, []);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = e.currentTarget.value;
      if (inputValue == inputValue.trimEnd()) {
        setCurrentStringValue(e.currentTarget.value);
        setPristine(false);
      } else {
        setCurrentStringValue("");
        setPristine(true);
        setTagList((prevList) => [
          ...prevList,
          { name: inputValue.trim(), color: "blue" } as Tag,
        ]);
      }
    },
    []
  );

  const deleteTag = (tag: Tag) => {
    console.log("Deleting tag " + tag.name);
    setTagList((prevList) => without(prevList, tag));
  };

  return useMemo(
    () => ({
      tagList,
      clear,
      deleteTag,
      isPristine,
      bindToInput: {
        value: currentStringValue,
        onChange,
      },
    }),
    [tagList, onChange, clear, deleteTag, isPristine]
  );
};

export type TagEditorProps = Readonly<{
  name: string;
  placeholder: string;
  icon?: IconProp;
  isInputInvalid: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  autoComplete: Tag[];
  tagInput: ReturnType<typeof useTagInput>;
}>;

export const TagEditor: FunctionComponent<TagEditorProps> = ({
  name,
  icon,
  placeholder,
  isInputInvalid,
  isLoading,
  isDisabled,
  tagInput,
}) => {
  const { bindToInput, tagList, isPristine, deleteTag } = tagInput;

  const className = classNames([
    "input",
    !isPristine && isInputInvalid && "is-danger",
  ]);

  const controlClasses = classNames([
    "control",
    "has-icons-left",
    isLoading && "is-loading",
  ]);

  return (
    <div>
      <div className="field">
        <label className="label">{name}</label>
        <div className={controlClasses}>
          <input
            autoFocus
            {...bindToInput}
            className={className}
            placeholder={placeholder}
            disabled={isDisabled || isLoading}
          />
          {icon && (
            <span className="icon is-left">
              <FontAwesomeIcon icon={icon} />
            </span>
          )}
        </div>
        {!isPristine && isInputInvalid && (
          <p className="help is-danger">{placeholder}</p>
        )}
      </div>
      <TagList>
        {tagList.map((tag, idx) => (
          <TagItem key={idx} {...tag} onDelete={() => deleteTag(tag)} />
        ))}
      </TagList>
    </div>
  );
};
